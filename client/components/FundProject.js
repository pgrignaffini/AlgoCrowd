import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import { optInApp, sendFunds } from "../utils/ContractOperations";
import API from '../APIs/API';


export default function FundProject({ project }) {

    const context = useAppContext()
    const algodClient = context["algodClient"]

    const [account, setAccount] = useState()

    console.log("Project id: " + project.appId)

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

    }, [algodClient]);

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            amount: event.target.amount.value,
        }

        if (data.amount.length === 0) {
            return
        }

        let amount = parseFloat(data.amount)

        const accountInfo = await algodClient.accountInformation(account).do();
        const isOptedIn = accountInfo["apps-local-state"].filter(app => String(app.id) === project.appId)
        if (!isOptedIn.length) await optInApp(algodClient, parseInt(project.appId), account)
        await sendFunds(algodClient, parseInt(project.appId), account, amount)
        await API.fundApp(account, project.appId, amount)
    }


    return (
        < div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto" >
            <div className="w-full block h-full">
                <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/5.jpg"
                    className="max-h-40 w-full object-cover" />
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                        {project.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                        {project.description}
                    </p>
                    <div>
                        <div className="bg-white rounded-lg block py-2 m-auto">
                            <div className="flex items-center mt-4">
                                <a href="#" className="block relative">
                                    <img alt="profil"
                                        src="https://www.riccardonegri.dev/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fthumb%2Fmen%2F97.jpg&w=96&q=75"
                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                                <div className="flex flex-col justify-between ml-4 text-sm">
                                    <p className="text-gray-800 dark:text-white">
                                        Jayden Slawa
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-300">
                                        0 days left
                                    </p>

                                </div>
                                <span
                                    className="ml-64 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-pink-500">
                                    Funding completed
                                </span>
                            </div>

                            <div>

                            </div>
                            <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                <div
                                    className="w-full h-full text-center text-xs text-white bg-pink-500 rounded-full">
                                    178%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:mt-0 lg:flex-shrink-0">
                        <div
                            className="flex flex-col m-auto max-w-md px-4 py-8 bg-white rounded-lg dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
                            <div className="p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col mb-2">
                                        <div className=" relative ">
                                            <input type="number" id="amount" step=".01" min="0"
                                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                name="" placeholder="Amount" required />
                                        </div>
                                    </div>
                                    <div className="w-full text-center">
                                        <button type="submit"
                                            className="w-32 mt-4 mb-2 py-2 px-4  bg-pink-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Send funds
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
