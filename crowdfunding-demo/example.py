from email.utils import getaddresses
from time import time, sleep

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
    platform = getTemporaryAccount(client)
    creator = getTemporaryAccount(client)
    funder_1 = getTemporaryAccount(client)
    funder_2 = getTemporaryAccount(client)

    print("Bob (crowdfunding creator account):", creator.getAddress())
    print("Algocrowd :", platform.getAddress())
    print("Alice (funder 1 account):", funder_1.getAddress())
    print("Carla (funder 2 account)", funder_2.getAddress(), "\n")

    alice_balance = getBalances(client, funder_1.getAddress())[0] / 1000_000
    bob_balance = getBalances(client, creator.getAddress())[0] / 1000_000
    carla_balance = getBalances(client, funder_2.getAddress())[0] / 1000_000
    algocrowd_balance = getBalances(client, platform.getAddress())[0] / 1000_000
    
    print(f"Alice's balances: {alice_balance} Algo \n")
    print(f"Bob's balances: {bob_balance} Algo \n")
    print(f"Carla's balances: {carla_balance} Algo \n")
    print(f"Algocrowd's balances: {algocrowd_balance} Algo \n")

    startTime = int(time()) + 10  # start time is 10 seconds in the future
    endTime = startTime + 40  # end time is 40 seconds after start
    goal = 5_000_000 
    total_funded = 0

    print("Bob is creating a crowdfunding that lasts 40 seconds...")
    appID = createCrowdfundingApp(
        client=client,
        creator=creator,
        goal=goal,
        algocrowd=platform
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

    now = int(time())
    if now < startTime + 10:
        waitTime = startTime + 10 - now
        print("Waiting {} seconds for the crowdfunding to start\n".format(waitTime))
        sleep(waitTime)

    actualAppBalancesBefore = getBalances(client, get_application_address(appID))
    print("Crowdfunding escrow balances:", actualAppBalancesBefore, "\n")

    fundAmount = 1000_000

    print("Alice is opting-in the application...\n")
    optInApp(client=client, appID=appID, account=funder_1)
    print("Done\n")

    print("Alice is sending funds for", fundAmount, "microAlgos")
    sendFunds(client=client, appID=appID, funder=funder_1, platform=platform, fundAmount=fundAmount)
    print("Done\n")

    total_funded += fundAmount

    fundAmount = 2000_000
    print("Carla is opting-in the application...\n")
    optInApp(client=client, appID=appID, account=funder_2)
    print("Done\n")

    print("Carla is sending funds for", fundAmount, "microAlgos")
    sendFunds(client=client, appID=appID, funder=funder_2, platform=platform, fundAmount=fundAmount)
    print("Done\n")

    total_funded += fundAmount

    now = int(time())
    if now < endTime + 5:
        waitTime = endTime + 5 - now
        print("Waiting {} seconds for the crowdfunding to finish\n".format(waitTime))
        sleep(waitTime)

    if total_funded < goal:
        print(f"Goal of {goal} not reached, collected {total_funded}")

        print("Alice is requesting a refund...\n")
        sendRefunds(client=client, appID=appID, user=funder_1)
        print("Done\n")

        print("Carla is requesting a refund...\n")
        sendRefunds(client=client, appID=appID, user=funder_2)
        print("Done\n")

    print("Bob is closing out the crowdfunding\n")
    closeCrowdfunding(client, appID, creator)

    actualAppBalances = getBalances(client, get_application_address(appID))[0]
    expectedAppBalances = 0
    print("The crowdfunding escrow now holds the following:", actualAppBalances)
    assert actualAppBalances == expectedAppBalances

    actualFunderOneBalances = getBalances(client, funder_1.getAddress())[0]
    print(
        "Alice's (funder) balances after crowdfunding: ",
        actualFunderOneBalances / 1000_000,
        " Algos",
    )
    actualFunderTwoBalances = getBalances(client, funder_2.getAddress())[0]
    print(
        "Carla's (funder) balances after crowdfunding: ",
        actualFunderTwoBalances / 1000_000,
        " Algos",
    )
    actualCreatorBalances = getBalances(client, creator.getAddress())[0]
    print(
        "Bob's (creator) balances after crowdfunding: ",
        actualCreatorBalances / 1000_000,
        " Algos",
    )

    actualPlatformBalances = getBalances(client, platform.getAddress())[0]
    print(
        "Platform balances after crowdfunding: ",
        actualPlatformBalances / 1000_000,
        " Algos",
    )


simple_crowdfunding()
