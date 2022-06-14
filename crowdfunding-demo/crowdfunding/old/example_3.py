from time import time, sleep

from algosdk import account, encoding
from algosdk.logic import get_application_address
from crowdfunding.operations import (
    createCrowdfundingApp,
    setupCrowdfundingApp,
    sendFunds,
    closeCrowdfunding,
    sendRefunds,
)
from crowdfunding.util import (
    getBalances,
    getAppGlobalState,
    getLastBlockTimestamp,
)
from crowdfunding.testing.setup import getAlgodClient
from crowdfunding.testing.resources import getTemporaryAccount, optInApp


def simple_crowdfunding():
    client = getAlgodClient()

    print("Generating temporary accounts...")
    creator = getTemporaryAccount(client)
    funder_1 = getTemporaryAccount(client)
    funder_2 = getTemporaryAccount(client)

    print("Alice (funder 1 account):", funder_1.getAddress())
    print("Bob (crowdfunding creator account):", creator.getAddress())
    print("Carla (funder 2 account)", funder_2.getAddress(), "\n")

    alice_balance = getBalances(client, funder_1.getAddress())[0] / 1000_000
    bob_balance = getBalances(client, creator.getAddress())[0] / 1000_000
    carla_balance = getBalances(client, funder_2.getAddress())[0] / 1000_000
    print(f"Alice's balances: {alice_balance} Algo \n")
    print(f"Bob's balances: {bob_balance} Algo \n")
    print(f"Carla's balances: {carla_balance} Algo \n")

    startTime = int(time()) + 10  # start time is 10 seconds in the future
    endTime = startTime + 40  # end time is 40 seconds after start
    goal = 5_000_000
    print("Bob is creating a crowdfunding that lasts 30 seconds...")
    appID = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator.getAddress(),
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )
    print(
        "Done. The crowdfunding app ID is",
        appID,
        "and the escrow account is",
        get_application_address(appID),
        "\n",
    )

    print("Bob is setting up the crowdfunding...")
    setupCrowdfundingApp(
        client=client,
        appID=appID,
        sender=creator,
    )
    print("Done\n")

    appID2 = createCrowdfundingApp(
        client=client,
        sender=creator,
        creator=creator.getAddress(),
        startTime=startTime,
        endTime=endTime,
        goal=goal,
    )
    print(
        "Done. The crowdfunding app ID is",
        appID2,
        "and the escrow account is",
        get_application_address(appID2),
        "\n",
    )

    print("Bob is setting up the crowdfunding...")
    setupCrowdfundingApp(
        client=client,
        appID=appID2,
        sender=creator,
    )
    print("Done\n")

    # _, lastRoundTime = getLastBlockTimestamp(client)
    # if lastRoundTime < startTime + 5:
    #     sleep(startTime + 5 - lastRoundTime)
    # actualAppBalancesBefore = getBalances(client, get_application_address(appID))
    # print("Crowdfunding escrow balances:", actualAppBalancesBefore, "\n")

    # fundAmount = 1000_000
    # print("Alice is sending funds for", fundAmount, "microAlgos")
    # sendFunds(client=client, appID=appID, funder=funder_1, fundAmount=fundAmount)
    # print("Done\n")

    # print("Alice is opting-in the application...\n")
    # optInApp(client=client, appID=appID, account=funder_1, fundAmount=fundAmount)
    # print("Done\n")

    # fundAmount = 2000_000
    # print("Carla is sending funds for", fundAmount, "microAlgos")
    # sendFunds(client=client, appID=appID, funder=funder_2, fundAmount=fundAmount)
    # print("Done\n")

    # print("Carla is opting-in the application...\n")
    # optInApp(client=client, appID=appID, account=funder_2, fundAmount=fundAmount)
    # print("Done\n")

    # # print("Alice is requesting a refund...\n")
    # # sendRefunds(client=client, appID=appID, user=funder_1)
    # # print("Done\n")

    # _, lastRoundTime = getLastBlockTimestamp(client)
    # if lastRoundTime < endTime + 5:
    #     waitTime = endTime + 5 - lastRoundTime
    #     print("Waiting {} seconds for the crowdfunding to finish\n".format(waitTime))
    #     sleep(waitTime)

    # print("Bob is closing out the crowdfunding\n")
    # closeCrowdfunding(client, appID, creator)

    # actualAppBalances = getBalances(client, get_application_address(appID))
    # expectedAppBalances = {0: 0}
    # print("The crowdfunding escrow now holds the following:", actualAppBalances)
    # assert actualAppBalances == expectedAppBalances

    # actualFunderOneBalances = getBalances(client, funder_1.getAddress())[0]
    # print(
    #     "Alice's (funder) balances after crowdfunding: ",
    #     actualFunderOneBalances / 1000_000,
    #     " Algos",
    # )
    # actualFunderTwoBalances = getBalances(client, funder_2.getAddress())[0]
    # print(
    #     "Carla's (funder) balances after crowdfunding: ",
    #     actualFunderTwoBalances / 1000_000,
    #     " Algos",
    # )
    # actualCreatorBalances = getBalances(client, creator.getAddress())[0]
    # print(
    #     "Bob's (creator) balances after crowdfunding: ",
    #     actualCreatorBalances / 1000_000,
    #     " Algos",
    # )


simple_crowdfunding()
