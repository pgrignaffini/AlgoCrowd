import React, { useRef, useState, useEffect } from "react";
import Create from "../components/CreateButton";
const algosdk = require("algosdk");
import { CONSTANTS } from "../constants/Constants";

export default function Home() {
  let userAccount = useRef();
  const [account, setAccount] = useState();
  const [isAccountConnected, setIsAccountConnected] = useState(false);
  const [signedTxs, setSignedTxs] = useState();
  const [sentTxn, setSentTxn] = useState(null);
  const [txnStatus, setTxnStatus] = useState(null);
  const [globalState, setGlobalState] = useState(null);
  const algodServer = "https://testnet-algorand.api.purestake.io/ps2/";
  // const indexerServer = "https://testnet-algorand.api.purestake.io/idx2";
  const token = { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY }; // using .env.local to load environment variables
  const port = "";
  const algodClient = new algosdk.Algodv2(token, algodServer, port);
  // const indexerClient = new algosdk.Indexer(token, indexerServer, port);

  useEffect(() => {
    if (algodClient !== null) {
      algodClient
        .healthCheck()
        .do()
        .then((d) => {
          console.log("HealthCheck successfully completed");
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [algodClient]);

  useEffect(() => {
    readGlobalState();
    console.log("Called readGlobalState");
  }, []);

  const connectAlgoSigner = async () => {
    if (typeof AlgoSigner !== "undefined") {
      await AlgoSigner.connect();
      getUserAccount();
    } else {
      Alert();
    }
  };

  const getUserAccount = async () => {
    userAccount.current = await AlgoSigner.accounts({
      ledger: "TestNet",
    });
    console.log(userAccount.current[0]["address"]);
    alert("Your Algorand Account is correctly connected!");

    setAccount(userAccount.current[0]["address"]);
    setIsAccountConnected(true);
  };

  const Alert = () => {
    alert("This browser doesn't have the required AlgoSigner extension!");
  };

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

  const readGlobalState = async () => {
    try {
      let applicationInfoResponse = await algodClient
        .getApplicationByID(CONSTANTS.APP_ID)
        .do();
      let globalStateTemp = applicationInfoResponse["params"]["global-state"];
      console.log("Global value raw: " + JSON.stringify(globalStateTemp));
      console.log("Value: " + globalStateTemp[0]["value"]["uint"]);
      globalStateTemp
        ? setGlobalState(globalStateTemp[0]["value"]["uint"])
        : "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">Want to fund an amazing project?</span>
          <span className="block text-indigo-500">It&#x27;s today or never.</span>
        </h2>
        <div>
          <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-md shadow">
              <button
                type="button"
                className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={connectAlgoSigner}
              >
                Connect your wallet
              </button>
            </div>
          </div>
        </div>

        {isAccountConnected && (
          <div>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-12 inline-flex rounded-md shadow">
                <button
                  type="button"
                  className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={basicTxn}
                >
                  Execute a basic transaction
                </button>
              </div>
            </div>
          </div>
        )}

        {sentTxn !== null && (
          <div>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-12 inline-flex rounded-md shadow">
                <button
                  type="button"
                  className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={checkTransactionStatus}
                >
                  Check transaction status
                </button>
              </div>
            </div>
          </div>
        )}

        {txnStatus !== null && (
          <div className="mx-auto w-3/6 px-4 py-4 bg-white rounded-lg dark:bg-gray-800">
            <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
              Your transaction details
            </h3>
            <p className="text-md text-gray-500 dark:text-gray-300 py-4 overflow-auto">
              {JSON.stringify(txnStatus)}
            </p>
          </div>
        )}
      </div>

      {isAccountConnected && (
        <div className="text-center">
          <div>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-12 inline-flex rounded-md w-1/2">
                <button
                  type="button"
                  className="mx-4 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => noop("Add")}
                >
                  Counter +
                </button>
                <button
                  type="button"
                  className="mx-4 py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => noop("Deduct")}
                >
                  Counter -
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-12 inline-flex rounded-md shadow"></div>
            </div>
          </div>
        </div>
      )}

      <div className="m-auto shadow-lg rounded-2xl w-36 p-4 bg-white dark:bg-gray-800">
        <div className="">
          <p className="text-md text-center text-gray-700 dark:text-gray-50 ml-2">
            Counter
          </p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-gray-800 text-4xl text-center dark:text-white font-bold my-4">
            {globalState}
          </p>
        </div>
      </div>
      <div className="w-full inline-flex mt-8">
        <button
          type="button"
          className="m-auto w-48 text-center py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          onClick={readGlobalState}
        >
          Refresh
        </button></div>
      <div className="w-full inline-flex mt-8">
        <Create client={algodClient} creator={account} />
      </div>
    </div>
  );
}
