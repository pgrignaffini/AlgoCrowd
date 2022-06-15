import React, { useRef, useState, useEffect } from "react";
import { createApp } from "../utils/ContractOperations";
import { useAppContext } from '../context/AppContext';
import { CONSTANTS } from "../constants/Constants";


export default function CreateProject() {

    const algosdk = require("algosdk");
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

    const daysToSeconds = (days) => {
        return days * 24 * 60 * 60;
    }

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            name: event.target.name.value,
            goal: event.target.goal.value,
            duration: event.target.duration.value
        }

        if (data.name.length === 0 || data.goal.length === 0 || data.duration.length === 0) {
            return
        }

        const durationInSeconds = daysToSeconds(parseInt(data.duration))
        console.log(data)

        account ? createApp(algodClient, account, parseInt(data.goal), durationInSeconds) : alert("You need to connect your account first")
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
                                            <input type="text" id="name"
                                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                name="pseudo" placeholder="Project name" required />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 mb-2">
                                        <div className=" relative ">
                                            <input type="number" id="goal"
                                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                name="First name" placeholder="Goal (algo)" required />
                                        </div>
                                        <div className=" relative ">
                                            <input type="number" id="duration"
                                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                name="Last name" placeholder="Duration (days)" required />
                                        </div>
                                    </div>
                                    <div className="flex w-full my-4">
                                        <button type="submit"
                                            className="py-2 px-4  bg-indigo-500 hover:bg-indigo-500 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Create
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
