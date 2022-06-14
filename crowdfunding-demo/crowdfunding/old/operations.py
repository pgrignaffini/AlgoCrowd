from typing import Tuple, List

from algosdk.v2client.algod import AlgodClient
from algosdk.future import transaction
from algosdk.logic import get_application_address
from algosdk import account, encoding

from pyteal import compileTeal, Mode

from .account import Account
from .contracts import approval_program, clear_state_program
from .util import (
    waitForTransaction,
    fullyCompileContract,
    getAppGlobalState,
)

APPROVAL_PROGRAM = b""
CLEAR_STATE_PROGRAM = b""


def getContracts(client: AlgodClient) -> Tuple[bytes, bytes]:
    """Get the compiled TEAL contracts for the auction.

    Args:
        client: An algod client that has the ability to compile TEAL programs.

    Returns:
        A tuple of 2 byte strings. The first is the approval program, and the
        second is the clear state program.
    """
    global APPROVAL_PROGRAM
    global CLEAR_STATE_PROGRAM

    if len(APPROVAL_PROGRAM) == 0:
        APPROVAL_PROGRAM = fullyCompileContract(client, approval_program())
        CLEAR_STATE_PROGRAM = fullyCompileContract(client, clear_state_program())

    return APPROVAL_PROGRAM, CLEAR_STATE_PROGRAM


def createCrowdfundingApp(
    client: AlgodClient,
    sender: Account,
    creator: str,
    startTime: int,
    endTime: int,
    goal: int,
) -> int:
    """Create a new auction.

    Args:
        client: An algod client.
        sender: The account that will create the auction application.
        creator: The address of the creator of the crowdfunded project
        startTime: A UNIX timestamp representing the start time of the auction.
            This must be greater than the current UNIX timestamp.
        endTime: A UNIX timestamp representing the end time of the auction. This
            must be greater than startTime.

    Returns:
        The ID of the newly created auction app.
    """
    approval, clear = getContracts(client)

    # declare application state storage (immutable)
    local_ints = 1
    local_bytes = 1
    global_ints = (
        14  # 4 for setup + 10 for choices. Use a larger number for more choices.
    )
    global_bytes = 1
    globalSchema = transaction.StateSchema(global_ints, global_bytes)
    localSchema = transaction.StateSchema(local_ints, local_bytes)

    app_args = [
        encoding.decode_address(creator),
        startTime.to_bytes(8, "big"),
        endTime.to_bytes(8, "big"),
        goal.to_bytes(8, "big"),
    ]

    txn = transaction.ApplicationCreateTxn(
        sender=sender.getAddress(),
        on_complete=transaction.OnComplete.NoOpOC,
        approval_program=approval,
        clear_program=clear,
        global_schema=globalSchema,
        local_schema=localSchema,
        app_args=app_args,
        sp=client.suggested_params(),
    )

    signedTxn = txn.sign(sender.getPrivateKey())

    client.send_transaction(signedTxn)

    response = waitForTransaction(client, signedTxn.get_txid())
    assert response.applicationIndex is not None and response.applicationIndex > 0
    return response.applicationIndex


def setupCrowdfundingApp(
    client: AlgodClient,
    appID: int,
    sender: Account,
) -> None:
    """Finish setting up an auction.

    This operation funds the app crowdfunding escrow account.
    The crowdfunding must not have started yet.

    The escrow account requires a total of 0.103 Algos for funding. See the code
    below for a breakdown of this amount.

    Args:
        client: An algod client.
        appID: The app ID of the auction.
        sender: The account providing the funding for the escrow account.
    """
    appAddr = get_application_address(appID)

    suggestedParams = client.suggested_params()

    fundingAmount = (
        # min account balance
        100_000
        # 3 * min txn fee
        + 3 * 1_000
    )

    fundAppTxn = transaction.PaymentTxn(
        sender=sender.getAddress(),
        receiver=appAddr,
        amt=fundingAmount,
        sp=suggestedParams,
    )

    setupTxn = transaction.ApplicationCallTxn(
        sender=sender.getAddress(),
        index=appID,
        on_complete=transaction.OnComplete.NoOpOC,
        app_args=[b"setup"],
        sp=suggestedParams,
    )

    transaction.assign_group_id([fundAppTxn, setupTxn])

    signedFundAppTxn = fundAppTxn.sign(sender.getPrivateKey())
    signedSetupTxn = setupTxn.sign(sender.getPrivateKey())

    client.send_transactions([signedFundAppTxn, signedSetupTxn])

    waitForTransaction(client, signedFundAppTxn.get_txid())


def sendFunds(
    client: AlgodClient, appID: int, funder: Account, fundAmount: int
) -> None:
    """Send funds to crowdfunding.

    Args:
        client: An Algod client.
        appID: The app ID of the auction.
        funder: The account providing the funds.
        fundAmount: The amount of the fund.
    """
    appAddr = get_application_address(appID)

    suggestedParams = client.suggested_params()

    payTxn = transaction.PaymentTxn(
        sender=funder.getAddress(),
        receiver=appAddr,
        amt=fundAmount,
        sp=suggestedParams,
    )

    appCallTxn = transaction.ApplicationCallTxn(
        sender=funder.getAddress(),
        index=appID,
        on_complete=transaction.OnComplete.NoOpOC,
        app_args=[b"fund"],
        sp=suggestedParams,
    )

    transaction.assign_group_id([payTxn, appCallTxn])

    signedPayTxn = payTxn.sign(funder.getPrivateKey())
    signedAppCallTxn = appCallTxn.sign(funder.getPrivateKey())

    client.send_transactions([signedPayTxn, signedAppCallTxn])

    waitForTransaction(client, appCallTxn.get_txid())


def sendRefunds(client: AlgodClient, appID: int, user: Account) -> None:
    """Send funds to crowdfunding.

    Args:
        client: An Algod client.
        appID: The app ID of the auction.
        funder: The account providing the funds.
        fundAmount: The amount of the fund.
    """
    suggestedParams = client.suggested_params()

    refundTxn = transaction.ApplicationCallTxn(
        sender=user.getAddress(),
        index=appID,
        on_complete=transaction.OnComplete.NoOpOC,
        app_args=[b"refund"],
        sp=suggestedParams,
    )

    signedRefundTxn = refundTxn.sign(user.getPrivateKey())

    client.send_transactions([signedRefundTxn])

    waitForTransaction(client, signedRefundTxn.get_txid())


def closeCrowdfunding(client: AlgodClient, appID: int, closer: Account):

    deleteTxn = transaction.ApplicationDeleteTxn(
        sender=closer.getAddress(),
        index=appID,
        sp=client.suggested_params(),
    )
    signedDeleteTxn = deleteTxn.sign(closer.getPrivateKey())

    client.send_transaction(signedDeleteTxn)

    waitForTransaction(client, signedDeleteTxn.get_txid())
