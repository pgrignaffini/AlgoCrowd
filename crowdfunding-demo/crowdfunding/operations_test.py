from pydoc import cli
from time import time, sleep
from pyteal import Global

import pytest

from algosdk import account, encoding
from algosdk.logic import get_application_address

from crowdfunding.operations import *
from crowdfunding.util import *
from crowdfunding.testing.setup import getAlgodClient
from crowdfunding.testing.resources import getTemporaryAccount, optInApp

PLATFORM_FEE = 5_000
TEMP_ACCOUNT_BALANCE = 100_000_000


def test_create():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    platform = getTemporaryAccount(client)

    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client, creator=creator, goal=goal, algocrowd=platform
    )

    actual = getAppGlobalState(client, appID)
    expected = {
        b"creator": encoding.decode_address(creator.getAddress()),
        b"goal": goal,
        b"total_funded": 0,
        b"algocrowd": encoding.decode_address(platform.getAddress()),
    }

    assert actual == expected


def test_setup():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    platform = getTemporaryAccount(client)

    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client, creator=creator, goal=goal, algocrowd=platform
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    actualState = getAppGlobalState(client, appID)
    expectedState = {
        b"creator": encoding.decode_address(creator.getAddress()),
        b"goal": goal,
        b"total_funded": 0,
        b"algocrowd": encoding.decode_address(platform.getAddress()),
    }

    assert actualState == expectedState

    actualBalances = getBalances(client, get_application_address(appID))
    expectedBalances = {
        0:
        # min account balance
        100_000
        # 3 * min txn fee
        + 3 * 1_000
    }

    assert actualBalances == expectedBalances


def test_funding_no_opt_in():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    platform = getTemporaryAccount(client)

    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client, creator=creator, goal=goal, algocrowd=platform
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    funder = getTemporaryAccount(client)

    with pytest.raises(Exception):
        fundAmount = 500_000  # 0.5 Algos
        sendFunds(
            client=client,
            appID=appID,
            funder=funder,
            platform=platform,
            fundAmount=fundAmount,
        )


def test_funding():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    platform = getTemporaryAccount(client)

    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client, creator=creator, goal=goal, algocrowd=platform
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    funder = getTemporaryAccount(client)
    funder_2 = getTemporaryAccount(client)

    optInApp(client=client, appID=appID, account=funder)
    optInApp(client=client, appID=appID, account=funder_2)

    fundAmount = 500_000  # 0.5 Algos
    sendFunds(
        client=client,
        appID=appID,
        funder=funder,
        platform=platform,
        fundAmount=fundAmount,
    )

    # there is no guarantee on ordering of keys in the map
    # ref: https://github.com/barnjamin/auction-demo/blob/main/web/plugins/lib/algorand.ts#L69-L98
    # assert getAppTotalFunded(client, appID)  == (fundAmount - PLATFORM_FEE)
    assert getUserFundedAmount(client, funder.getAddress()) == (
        fundAmount - PLATFORM_FEE
    )

    actualBalances = getBalances(client, get_application_address(appID))
    expectedBalances = {
        0:
        # min account balance
        100_000
        # 3 * min txn fee
        + 3 * 1_000
        + fundAmount
        - PLATFORM_FEE
    }

    assert actualBalances == expectedBalances

    actualBalances = getBalances(client, platform.getAddress())
    expectedBalances = {0: TEMP_ACCOUNT_BALANCE + PLATFORM_FEE}

    assert actualBalances[0] >= expectedBalances[0] >= 100_005_000


def test_goal_met():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    platform = getTemporaryAccount(client)

    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client, creator=creator, goal=goal, algocrowd=platform
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    APP_STARTING_BALANCE = 103_000

    actualAppBalances = getBalances(client, get_application_address(appID))
    print("App balance " + str(actualAppBalances[0]))

    creatorAlgosBefore = getBalances(client, creator.getAddress())[0]

    funder = getTemporaryAccount(client)

    funderAlgosBefore = getBalances(client, funder.getAddress())[0]

    optInApp(client=client, appID=appID, account=funder)

    fundAmount = 2000_000
    sendFunds(
        client=client,
        appID=appID,
        funder=funder,
        platform=platform,
        fundAmount=fundAmount,
    )
    actualAppBalances = getBalances(client, get_application_address(appID))
    print("App balance " + str(actualAppBalances[0]))

    closeCrowdfunding(client, appID, creator)

    actualAppBalances = getBalances(client, get_application_address(appID))
    expectedAppBalances = {0: 0}

    assert actualAppBalances == expectedAppBalances

    funderBalance = getBalances(client, funder.getAddress())[0]

    assert (
        funderAlgosBefore - fundAmount - 4_000
        <= funderBalance
        <= funderAlgosBefore - fundAmount - 3_000
    )

    creatorBalance = getBalances(client, creator.getAddress())[0]

    assert (
        creatorBalance
        == creatorAlgosBefore
        + APP_STARTING_BALANCE
        + fundAmount
        - PLATFORM_FEE
        - 2 * 1_000
    )


def test_refunds():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    platform = getTemporaryAccount(client)

    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client, creator=creator, goal=goal, algocrowd=platform
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    funder = getTemporaryAccount(client)
    funderAlgosBefore = getBalances(client, funder.getAddress())[0]

    optInApp(client=client, appID=appID, account=funder)
    funderBalanceAfterOptIn = getBalances(client, funder.getAddress())[0]
    # each tx costs ~1000 in fees
    assert (
        funderAlgosBefore - 500 >= funderBalanceAfterOptIn >= funderAlgosBefore - 1000
    )

    fundAmount = 500_000
    sendFunds(
        client=client,
        appID=appID,
        funder=funder,
        platform=platform,
        fundAmount=fundAmount,
    )
    assert getUserFundedAmount(client, funder.getAddress()) == fundAmount - PLATFORM_FEE
    funderBalanceAfterSendingFunds = getBalances(client, funder.getAddress())[0]
    # sendFunds consists of 3 txs =~ 3000 in fees
    assert (
        funderBalanceAfterOptIn - fundAmount - 2 * 1000
        >= funderBalanceAfterSendingFunds
        >= funderBalanceAfterOptIn - fundAmount - 3 * 1000
    )

    sendRefunds(client=client, appID=appID, user=funder)
    funderBalanceAfterGettingRefund = getBalances(client, funder.getAddress())[0]
    # sendRefunds consists of 2 txs =~ 2000 in fees
    assert (
        funderBalanceAfterSendingFunds + fundAmount - PLATFORM_FEE - 1000
        >= funderBalanceAfterGettingRefund
        >= funderBalanceAfterSendingFunds + fundAmount - PLATFORM_FEE - 2 * 1000
    )

    closeCrowdfunding(client, appID, creator)

    platformBalance = getBalances(client, platform.getAddress())[0]

    assert (
        TEMP_ACCOUNT_BALANCE + PLATFORM_FEE + 1000
        >= platformBalance
        >= TEMP_ACCOUNT_BALANCE + PLATFORM_FEE
    )


def test_double_refunds():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    platform = getTemporaryAccount(client)

    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client, creator=creator, goal=goal, algocrowd=platform
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    funder = getTemporaryAccount(client)
    funderAlgosBefore = getBalances(client, funder.getAddress())[0]

    optInApp(client=client, appID=appID, account=funder)
    funderBalanceAfterOptIn = getBalances(client, funder.getAddress())[0]
    # each tx costs ~1000 in fees
    assert (
        funderAlgosBefore - 500 >= funderBalanceAfterOptIn >= funderAlgosBefore - 1000
    )

    fundAmount = 500_000
    sendFunds(
        client=client,
        appID=appID,
        funder=funder,
        platform=platform,
        fundAmount=fundAmount,
    )
    assert getUserFundedAmount(client, funder.getAddress()) == fundAmount - PLATFORM_FEE
    funderBalanceAfterSendingFunds = getBalances(client, funder.getAddress())[0]
    # sendFunds consists of 3 txs =~ 3000 in fees
    assert (
        funderBalanceAfterOptIn - fundAmount - 2 * 1000
        >= funderBalanceAfterSendingFunds
        >= funderBalanceAfterOptIn - fundAmount - 3 * 1000
    )

    sendRefunds(client=client, appID=appID, user=funder)
    with pytest.raises(Exception):
        sendRefunds(client=client, appID=appID, user=funder)


def test_double_close():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    platform = getTemporaryAccount(client)

    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client, creator=creator, goal=goal, algocrowd=platform
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    actualAppBalances = getBalances(client, get_application_address(appID))
    print("App balance " + str(actualAppBalances[0]))

    funder = getTemporaryAccount(client)

    optInApp(client=client, appID=appID, account=funder)

    fundAmount = 2000_000
    sendFunds(
        client=client,
        appID=appID,
        funder=funder,
        platform=platform,
        fundAmount=fundAmount,
    )
    actualAppBalances = getBalances(client, get_application_address(appID))
    print("App balance " + str(actualAppBalances[0]))

    closeCrowdfunding(client, appID, creator)

    with pytest.raises(Exception):
        closeCrowdfunding(client, appID, creator)
