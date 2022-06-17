import algosdk from 'algosdk';
import { Buffer } from "buffer";
import { CONSTANTS } from '../constants/Constants';

const getParams = async () => {
    const params = await algodClient.getTransactionParams().do();
    return params;
};

const signTransaction = async (txn_b64) => {
    const signTxn = await AlgoSigner.signTxn([{ txn: txn_b64 }]);
    return signTxn;
};

const sendTransaction = async (signedTxs) => {
    console.log("Ready to send transaction");
    const res = await AlgoSigner.send({
        ledger: "TestNet",
        tx: signedTxs[0].blob,
    });
    console.log("Sent the transaction " + JSON.stringify(res));
    return res;
};

const basicTxn = async () => {
    const params = await getParams();

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: account,
        to: "LWVRL7V2LMEUEDLIBBA2Q53RZ2BZUWASRJEA6GG4O3DWPRWAKZ4PIZ33UY",
        amount: 10000,
        suggestedParams: { ...params },
    });

    // Use the AlgoSigner encoding library to make the transactions base64
    let txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());

    // Ask the user to sign a payment transaction using AlgoSigner's Sign method
    signedTxs = await signTransaction(txn_b64);

    // Send the previously signed transaction using AlgoSigner's Send method
    const temp = await sendTransaction(signedTxs);
    setSentTxn(temp);
    console.log("Finished");
};

const checkTransactionStatus = () => {
    // Query the pending transaction endpoint to check the sent transaction status
    algodClient
        .pendingTransactionInformation(sentTxn.txId)
        .do()
        .then((d) => {
            setTxnStatus(d);
            console.log(d);
        })
        .catch((e) => {
            console.error(e);
        });
};

// call application with arguments
const noop = async (action) => {
    try {
        userAccount.current = await AlgoSigner.accounts({
            ledger: "TestNet",
        });

        console.log(action);

        const appArgs = [];
        appArgs.push(new Uint8Array(Buffer.from(action)));

        let params = await algodClient.getTransactionParams().do();
        params.fee = 10000;
        params.flatFee = true;

        // create unsigned transaction
        let txn = algosdk.makeApplicationNoOpTxn(
            account,
            params,
            CONSTANTS.APP_ID,
            appArgs
        );

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
        let txId = await algodClient.sendRawTransaction(binarySignedTx).do();
        console.log(txId);
    } catch (err) {
        console.log(err);
    }
};

const readGlobalState = async (algodClient, appId) => {
    try {
        let applicationInfoResponse = await algodClient
            .getApplicationByID(appId)
            .do();
        let globalStateTemp = applicationInfoResponse["params"]["global-state"];
        // console.log("Global value raw: " + JSON.stringify(globalStateTemp));
        // console.log("Value: " + globalStateTemp[0]["value"]["uint"]);
        return globalStateTemp
    } catch (err) {
        console.log(err);
    }

};

export const readTotalFundedFromGlobalState = async (algodClient, appId) => {
    const gstate = await readGlobalState(algodClient, appId)
    const total_funded = gstate?.filter(e => e.key === CONSTANTS.total_funded_key);
    if (total_funded) return total_funded[0]["value"]["uint"]
    else return 0
}

export const readGoalFromGlobalState = async (algodClient, appId) => {
    const gstate = await readGlobalState(algodClient, appId)
    const total_funded = gstate?.filter(e => e.key === CONSTANTS.goal_key);
    if (total_funded) return total_funded[0]["value"]["uint"]
    else return 0
}