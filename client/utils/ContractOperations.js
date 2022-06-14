import React from 'react'
import algosdk from 'algosdk';
import { approval } from '../constants/Approval';
import { clear } from '../constants/Clear';
import { Buffer } from "buffer";
import { CONSTANTS } from '../constants/Constants';


const compileTeal = async (client, tealFile) => {
    try {
        // Compile Program
        let encoder = new TextEncoder();
        let programBytes = encoder.encode(tealFile);
        let compileResponse = await client.compile(programBytes).do();
        let compiledBytes = new Uint8Array(Buffer.from(compileResponse.result, "base64"));
        console.log(compileResponse)
        return compiledBytes;
    } catch (err) {
        console.error(err)
    }
}

//CREATE APP
// create unsigned transaction
export async function createApp(client, creator, goal, duration) {

    goal *= 1000000
    const localInts = 1;
    const localBytes = 1;
    const globalInts = 14;
    const globalBytes = 2;

    // const startTime = new Date().getTime()
    // const endTime = startTime + duration * 1000

    //create list of bytes for app args
    let appArgs = [];
    if (creator !== undefined) {
        console.log(appArgs.push(
            algosdk.decodeAddress(creator).publicKey,
            algosdk.bigIntToBytes(goal, 8),
            algosdk.decodeAddress(CONSTANTS.algocrowd).publicKey,
        ))
    }

    // app_args = [
    //     encoding.decode_address(creator.getAddress()),
    //     goal.to_bytes(8, "big"),
    //     encoding.decode_address(algocrowd.getAddress()),
    // ]

    const approvalProgram = await compileTeal(client, approval)
    const clearProgram = await compileTeal(client, clear)

    const onComplete = algosdk.OnApplicationComplete.NoOpOC;

    let params = await client.getTransactionParams().do()
    params.fee = 1000;
    params.flatFee = true;

    console.log("suggestedparams" + params)

    let txn = algosdk.makeApplicationCreateTxn(creator, params, onComplete,
        approvalProgram, clearProgram,
        localInts, localBytes, globalInts, globalBytes, appArgs);
    let txId = txn.txID().toString();

    // Use the AlgoSigner encoding library to make the transactions base64
    const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    // Sign the transaction
    let signedTxs = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    console.log(signedTxs);

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(
        signedTxs[0].blob
    );

    // Send the transaction through the SDK client
    console.log("Attempting to send transaction")
    await client.sendRawTransaction(binarySignedTx).do();
    console.log("Tx id: " + JSON.stringify(txId))

    // Wait for transaction to be confirmed
    let confirmedTxn = await algosdk.waitForConfirmation(client, txId, 4);
    console.log("confirmed" + confirmedTxn)

    //Get the completed Transaction
    console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

    // display results
    let transactionResponse = await client.pendingTransactionInformation(txId).do()
    let appId = transactionResponse['application-index'];
    console.log("Response: " + JSON.stringify(transactionResponse))
    console.log("Created new app-id: ", appId);

}

export async function setupApp(client, appID, creator) {

    const appAddr = algosdk.getApplicationAddress(appID)
    let params = await client.getTransactionParams().do();
    const fundingAmount = (
        // min account balance
        100000
        // 3 * min txn fee
        + 3 * 1000
    )

    let fundAppTxn = algosdk.makePaymentTxnWithSuggestedParams(creator, appAddr, fundingAmount, undefined, new Uint8Array(0), params)
    console.log("SETUP PAYMENT TRANSACTION -> " + fundAppTxn)
    let fundAppTxnId = fundAppTxn.txID().toString();
    console.log("Fund app txn id: " + fundAppTxnId)

    // fundAppTxn = transaction.PaymentTxn(
    //     sender=sender.getAddress(),
    //     receiver=appAddr,
    //     amt=fundingAmount,
    //     sp=suggestedParams,
    // )

    const onComplete = algosdk.OnApplicationComplete.NoOpOC;
    const options = {
        from: creator,
        suggestedParams: params,
        appIndex: appID,
        onComplete: onComplete,
        appArgs: [new Uint8Array(Buffer.from("setup"))]
    }

    let setupTxn = algosdk.makeApplicationCallTxnFromObject({ ...options })
    let setupTxnId = setupTxn.txID().toString();
    console.log("Setup app txn id: " + setupTxnId)

    algosdk.assignGroupID([fundAppTxn, setupTxn])

    let binaryTxs = [fundAppTxn.toByte(), setupTxn.toByte()];
    let base64Txs = binaryTxs.map((binary) => AlgoSigner.encoding.msgpackToBase64(binary));

    let signedTxs = await AlgoSigner.signTxn([
        {
            txn: base64Txs[0],
        },
        {
            txn: base64Txs[1],
        },
    ]);

    console.log(signedTxs);
    console.log("Txs signed")

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTxs = signedTxs.map((tx) => AlgoSigner.encoding.base64ToMsgpack(tx.blob));

    const sendTxs = await client.sendRawTransaction(binarySignedTxs).do();
    console.log("Tx sent: " + JSON.stringify(sendTxs))

    let confirmedTxn = await algosdk.waitForConfirmation(client, signedTxs[0]["txID"], 4);
    console.log("tx confirmed" + JSON.stringify(confirmedTxn["confirmed-round"]))

    confirmedTxn = await algosdk.waitForConfirmation(client, signedTxs[1]["txID"], 4);
    console.log("tx confirmed " + JSON.stringify(confirmedTxn["confirmed-round"]))

}

export async function sendFunds(client, appID, funder, fundingAmount) {

    const appAddr = algosdk.getApplicationAddress(appID)
    let params = await client.getTransactionParams().do();

    //convert to Algos
    fundingAmount *= 1000000

    let fundTxn = algosdk.makePaymentTxnWithSuggestedParams(funder, appAddr, fundingAmount - CONSTANTS.PLATFORM_FEE, undefined, new Uint8Array(0), params)
    console.log("FUND TRANSACTION -> " + fundTxn)
    let fundTxnId = fundTxn.txID().toString();
    console.log("FUND app txn id: " + fundTxnId)

    let payFeesTxn = algosdk.makePaymentTxnWithSuggestedParams(funder, CONSTANTS.algocrowd, CONSTANTS.PLATFORM_FEE, undefined, new Uint8Array(0), params)
    console.log("PAY FEES TRANSACTION -> " + payFeesTxn)
    let payFeesTxnId = payFeesTxn.txID().toString();
    console.log("PAY FEES txn id: " + payFeesTxnId)

    const onComplete = algosdk.OnApplicationComplete.NoOpOC;
    const options = {
        from: funder,
        suggestedParams: params,
        appIndex: appID,
        onComplete: onComplete,
        appArgs: [new Uint8Array(Buffer.from("fund"))]
    }

    let appCallTxn = algosdk.makeApplicationCallTxnFromObject({ ...options })
    console.log("APPCALL TRANSACTION -> " + appCallTxn)
    let appCallTxnId = appCallTxn.txID().toString();
    console.log("App call txn id: " + appCallTxnId)

    algosdk.assignGroupID([fundTxn, payFeesTxn, appCallTxn])

    let binaryTxs = [fundTxn.toByte(), payFeesTxn.toByte(), appCallTxn.toByte()];
    let base64Txs = binaryTxs.map((binary) => AlgoSigner.encoding.msgpackToBase64(binary));

    let signedTxs = await AlgoSigner.signTxn([
        {
            txn: base64Txs[0],
        },
        {
            txn: base64Txs[1],
        },
        {
            txn: base64Txs[2],
        },
    ]);


    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTxs = signedTxs.map((tx) => AlgoSigner.encoding.base64ToMsgpack(tx.blob));

    const sendTxs = await client.sendRawTransaction(binarySignedTxs).do();
    console.log("Tx sent: " + JSON.stringify(sendTxs))

    let confirmedTxn = await algosdk.waitForConfirmation(client, signedTxs[0]["txID"], 4);
    console.log("tx confirmed" + confirmedTxn["confirmed-round"])

}

export async function sendRefunds(client, appID, user) {

    let params = await client.getTransactionParams().do();

    const onComplete = algosdk.OnApplicationComplete.NoOpOC;
    const options = {
        from: user,
        suggestedParams: params,
        appIndex: appID,
        onComplete: onComplete,
        appArgs: [new Uint8Array(Buffer.from("refund"))]
    }

    let refundTxn = algosdk.makeApplicationCallTxnFromObject({ ...options })

    // Use the AlgoSigner encoding library to make the transactions base64
    const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(refundTxn.toByte());

    // Sign the transaction
    let signedTx = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    console.log(signedTx);

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(
        signedTx[0].blob
    );

    // Send the transaction through the SDK client
    console.log("Attempting to send transaction")
    await client.sendRawTransaction(binarySignedTx).do();

    // Wait for transaction to be confirmed
    let confirmedTxn = await algosdk.waitForConfirmation(client, signedTx[0]["txID"], 4);
    console.log("confirmed" + confirmedTxn["confirmed-round"])

}

export async function closeCrowdfunding(client, appID, user) {

    let params = await client.getTransactionParams().do();

    const options = {
        from: user,
        suggestedParams: params,
        appIndex: appID,
    }

    let deleteTxn = algosdk.makeApplicationDeleteTxnFromObject({ ...options })

    // Use the AlgoSigner encoding library to make the transactions base64
    const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(deleteTxn.toByte());

    // Sign the transaction
    let signedTx = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    console.log(signedTx);

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(
        signedTx[0].blob
    );

    // Send the transaction through the SDK client
    console.log("Attempting to send transaction")
    await client.sendRawTransaction(binarySignedTx).do();

    // Wait for transaction to be confirmed
    let confirmedTxn = await algosdk.waitForConfirmation(client, signedTx[0]["txID"], 4);
    console.log("confirmed" + confirmedTxn["confirmed-round"])

}

export async function optInApp(client, appID, user) {

    let params = await client.getTransactionParams().do();

    const options = {
        from: user,
        suggestedParams: params,
        appIndex: appID,
    }

    let optInTxn = algosdk.makeApplicationOptInTxnFromObject({ ...options })

    // Use the AlgoSigner encoding library to make the transactions base64
    const txn_b64 = await AlgoSigner.encoding.msgpackToBase64(optInTxn.toByte());

    // Sign the transaction
    let signedTx = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    console.log(signedTx);

    // Get the base64 encoded signed transaction and convert it to binary
    let binarySignedTx = await AlgoSigner.encoding.base64ToMsgpack(
        signedTx[0].blob
    );

    // Send the transaction through the SDK client
    console.log("Attempting to send transaction")
    await client.sendRawTransaction(binarySignedTx).do();

    // Wait for transaction to be confirmed
    let confirmedTxn = await algosdk.waitForConfirmation(client, signedTx[0]["txID"], 4);
    console.log("confirmed" + confirmedTxn["confirmed-round"])

}
