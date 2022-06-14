import React, {useEffect} from "react";

const algosdk = require("algosdk");
import {useAppContext} from '../context/AppContext';


export default function CreateProject() {
    const algodServer = "https://testnet-algorand.api.purestake.io/ps2/";
    const token = {"X-API-Key": process.env.NEXT_PUBLIC_API_KEY}; // using .env.local to load environment variables
    const port = "";
    const algodClient = new algosdk.Algodv2(token, algodServer, port);

    const context = useAppContext()
    const accountContext = context["account"]

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

        console.log("Info from context: " + JSON.stringify(accountContext))
    }, [algodClient]);

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page
        event.preventDefault()

        // Get data from the form
        const data = {
            appid: event.target.appid.value,
        }

        if (data.appid.length === 0) {
            return
        }

        // do something
    }

    return (
        <div className="bg-white dark:bg-gray-800 ">
            <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
                    <span className="block">Create new project to fund! </span>
                    <span className="block text-indigo-500">It&#x27;s today or never.</span>
                </h2>

                <div>
                    <div className="lg:mt-0 lg:flex-shrink-0">
                        <div
                            className="flex flex-col m-auto max-w-md px-4 py-8 bg-white rounded-lg dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                            <div className="p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col mb-2">
                                        <div className=" relative ">
                                            <input type="number" id="appid"
                                                   className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                   placeholder="App ID" required/>
                                        </div>
                                    </div>
                                    <div className="flex w-full my-4">
                                        <button type="submit"
                                                className="py-2 px-4  bg-indigo-500 hover:bg-indigo-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Claim Funds
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
