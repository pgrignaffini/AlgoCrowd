import React from 'react'
import algosdk from 'algosdk';
import {approvalCounter} from "../constants/ApprovalCounter";
import {clearCounter} from "../constants/ClearCounter";
import {Buffer} from "buffer";

export default function CreateButtonCounter({client, creator}) {

    const localInts = 0;
    const localBytes = 0;
    const globalInts = 1;
    const globalBytes = 0;
    let utf8Encode = new TextEncoder();

    // convert 64 bit integer i to byte string
    const intToBytes = (integer) => {
        return integer.toString()
    }

    //create list of bytes for app args
    let appArgs = [];

    // app_args = [
    //     encoding.decode_address(creator),
    //     startTime.to_bytes(8, "big"),
    //     endTime.to_bytes(8, "big"),
    //     goal.to_bytes(8, "big"),
    // ]

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
    const createApp = async (app_args) => {

        const approvalProgram = await compileTeal(client, approvalCounter)
        const clearProgram = await compileTeal(client, clearCounter)

        const onComplete = algosdk.OnApplicationComplete.NoOpOC;

        let params = await client.getTransactionParams().do()
        params.fee = 1000;
        params.flatFee = true;

        console.log("suggestedparams" + params)

        let txn = algosdk.makeApplicationCreateTxn(creator, params, onComplete,
            approvalProgram, clearProgram,
            localInts, localBytes, globalInts, globalBytes, app_args);
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

    return (
        <>
            <button
                type="button"
                className="m-auto w-48 text-center py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={() => createApp(appArgs)}>Create Counter!
            </button>
        </>
    )
}
