from time import time, sleep
from pyteal import Global

import pytest

from algosdk import account, encoding
from algosdk.logic import get_application_address

from crowdfunding.operations import *
from crowdfunding.util import *
from crowdfunding.testing.setup import getAlgodClient
from crowdfunding.testing.resources import getTemporaryAccount, optInApp


def test_create():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    creator_addr = creator.getAddress()

    startTime = int(time()) + 10  # start time is 10 seconds in the future
    endTime = startTime + 60  # end time is 1 minute after start
    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator_addr,
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )

    actual = getAppGlobalState(client, appID)
    expected = {
        b"creator": encoding.decode_address(creator_addr),
        b"start": startTime,
        b"end": endTime,
        b"goal": goal,
        b"total_funded": 0,
    }

    assert actual == expected


def test_setup():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    creator_addr = creator.getAddress()

    startTime = int(time()) + 10  # start time is 10 seconds in the future
    endTime = startTime + 60  # end time is 1 minute after start
    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator_addr,
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    actualState = getAppGlobalState(client, appID)
    expectedState = {
        b"creator": encoding.decode_address(creator_addr),
        b"start": startTime,
        b"end": endTime,
        b"goal": goal,
        b"total_funded": 0,
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


def test_fund_before_start():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    creator_addr = creator.getAddress()

    startTime = int(time()) + 5 * 60  # start time is 5 minutes in the future
    endTime = startTime + 60  # end time is 1 minute after start
    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator_addr,
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    funder = getTemporaryAccount(client)

    _, lastRoundTime = getLastBlockTimestamp(client)
    assert lastRoundTime < startTime

    with pytest.raises(Exception):
        fundAmount = 500_000  # 0.5 Algos
        sendFunds(client=client, appID=appID, funder=funder, fundAmount=fundAmount)


def test_funding():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    creator_addr = creator.getAddress()

    startTime = int(time()) + 5 * 60  # start time is 5 minutes in the future
    endTime = startTime + 60  # end time is 1 minute after start
    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator_addr,
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    funder = getTemporaryAccount(client)

    _, lastRoundTime = getLastBlockTimestamp(client)
    if lastRoundTime < startTime + 5:
        sleep(startTime + 5 - lastRoundTime)

    fundAmount = 500_000  # 0.5 Algos
    sendFunds(client=client, appID=appID, funder=funder, fundAmount=fundAmount)

    # TODO: check app local state for fundAmount === InvestedAmount
    # actualState = getAppGlobalState(client, appID)
    # expectedState = {
    #     b"seller": encoding.decode_address(seller.getAddress()),
    #     b"nft_id": nftID,
    #     b"start": startTime,
    #     b"end": endTime,
    #     b"reserve_amount": reserve,
    #     b"min_bid_inc": increment,
    #     b"num_bids": 1,
    #     b"bid_amount": bidAmount,
    #     b"bid_account": encoding.decode_address(bidder.getAddress()),
    # }

    # assert actualState == expectedState

    actualBalances = getBalances(client, get_application_address(appID))
    expectedBalances = {
        0:
        # min account balance
        100_000
        # 3 * min txn fee
        + 3 * 1_000
        + fundAmount
    }

    assert actualBalances == expectedBalances


def test_close_before_start():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    creator_addr = creator.getAddress()

    startTime = int(time()) + 5 * 60  # start time is 5 minutes in the future
    endTime = startTime + 60  # end time is 1 minute after start
    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator_addr,
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )
    _, lastRoundTime = getLastBlockTimestamp(client)
    assert lastRoundTime < startTime

    closeCrowdfunding(client, appID, creator)

    actualAppBalances = getBalances(client, get_application_address(appID))
    expectedAppBalances = {0: 0}

    assert actualAppBalances == expectedAppBalances


# def test_close_reserve_not_met():
#     client = getAlgodClient()

#     creator = getTemporaryAccount(client)
#     seller = getTemporaryAccount(client)

#     nftAmount = 1
#     nftID = createDummyAsset(client, nftAmount, seller)

#     startTime = int(time()) + 10  # start time is 10 seconds in the future
#     endTime = startTime + 30  # end time is 30 seconds after start
#     reserve = 1_000_000  # 1 Algo
#     increment = 100_000  # 0.1 Algo

#     appID = createAuctionApp(
#         client=client,
#         sender=creator,
#         seller=seller.getAddress(),
#         nftID=nftID,
#         startTime=startTime,
#         endTime=endTime,
#         reserve=reserve,
#         minBidIncrement=increment,
#     )

#     setupAuctionApp(
#         client=client,
#         appID=appID,
#         funder=creator,
#         nftHolder=seller,
#         nftID=nftID,
#         nftAmount=nftAmount,
#     )

#     bidder = getTemporaryAccount(client)

#     _, lastRoundTime = getLastBlockTimestamp(client)
#     if lastRoundTime < startTime + 5:
#         sleep(startTime + 5 - lastRoundTime)

#     bidAmount = 500_000  # 0.5 Algos
#     placeBid(client=client, appID=appID, bidder=bidder, bidAmount=bidAmount)

#     bidderAlgosBefore = getBalances(client, bidder.getAddress())[0]

#     _, lastRoundTime = getLastBlockTimestamp(client)
#     if lastRoundTime < endTime + 5:
#         sleep(endTime + 5 - lastRoundTime)

#     closeAuction(client, appID, seller)

#     actualAppBalances = getBalances(client, get_application_address(appID))
#     expectedAppBalances = {0: 0}

#     assert actualAppBalances == expectedAppBalances

#     bidderAlgosAfter = getBalances(client, bidder.getAddress())[0]

#     # bidder should receive a refund of their bid, minus the txn fee
#     assert bidderAlgosAfter - bidderAlgosBefore >= bidAmount - 1_000

#     sellerNftBalance = getBalances(client, seller.getAddress())[nftID]
#     assert sellerNftBalance == nftAmount


def test_goal_met():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    creator_addr = creator.getAddress()

    startTime = int(time()) + 10  # start time is 10 seconds in the future
    endTime = startTime + 30  # end time is 30 seconds after start
    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator_addr,
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    creatorAlgosBefore = getBalances(client, creator_addr)[0]

    funder = getTemporaryAccount(client)

    funderAlgosBefore = getBalances(client, funder.getAddress())[0]

    _, lastRoundTime = getLastBlockTimestamp(client)
    if lastRoundTime < startTime + 5:
        sleep(startTime + 5 - lastRoundTime)

    fundAmount = 2000_000
    sendFunds(client=client, appID=appID, funder=funder, fundAmount=fundAmount)

    optInApp(client=client, appID=appID, account=funder, fundAmount=fundAmount)

    _, lastRoundTime = getLastBlockTimestamp(client)
    if lastRoundTime < endTime + 5:
        sleep(endTime + 5 - lastRoundTime)

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

    creatorBalance = getBalances(client, creator_addr)[0]

    assert creatorBalance >= creatorAlgosBefore + fundAmount - 1_000


def test_create():
    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    creator_addr = creator.getAddress()

    startTime = int(time()) + 10  # start time is 10 seconds in the future
    endTime = startTime + 60  # end time is 1 minute after start
    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator_addr,
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )

    actual = getAppGlobalState(client, appID)
    expected = {
        b"creator": encoding.decode_address(creator_addr),
        b"start": startTime,
        b"end": endTime,
        b"goal": goal,
        b"total_funded": 0,
    }

    assert actual == expected


def test_local_state_equal_to_funded_amount():

    client = getAlgodClient()

    creator = getTemporaryAccount(client)
    creator_addr = creator.getAddress()

    startTime = int(time()) + 10  # start time is 10 seconds in the future
    endTime = startTime + 60  # end time is 1 minute after start
    goal = 1_000_000  # 1 Algo

    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator_addr,
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )

    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )

    funder = getTemporaryAccount(client)

    fundAmount = 500_000  # 0.5 Algos
    sendFunds(client=client, appID=appID, funder=funder, fundAmount=fundAmount)
    optInApp(client=client, appID=appID, account=funder, fundAmount=fundAmount)
    
    assert getUserFundedAmount(client, funder.addr) == fundAmount



