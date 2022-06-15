import React, { useState, useEffect } from "react";
import Create from "../components/CreateButton";
import { CONSTANTS } from "../constants/Constants";
import algosdk from 'algosdk';


export default function Home() {

  const algodServer = CONSTANTS.baseServer
  const token = CONSTANTS.algodToken // using .env.local to load environment variables
  const port = CONSTANTS.port
  const algodClient = new algosdk.Algodv2(token, algodServer, port);
  const [account, setAccount] = useState()

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

    const connectedAccount = localStorage.getItem('connectedAccount')
    if (connectedAccount) setAccount(connectedAccount)

    console.log("Info from storage: " + String(account))
  }, [algodClient]);

  return (
    <div className="bg-white dark:bg-gray-800 ">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">Want to fund an amazing project?</span>
          <span className="block text-indigo-500">It&#x27;s today or never.</span>
        </h2>


        {account && (
          <div>
            <div className="lg:mt-0 lg:flex-shrink-0">
              <div className="mt-12 inline-flex rounded-md shadow">
                <button
                  type="button"
                  className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Execute a basic transaction
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
