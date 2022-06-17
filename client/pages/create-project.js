import React, { useRef, useState, useEffect } from "react";
import { createApp, setupApp } from "../utils/ContractOperations";
import { useAppContext } from '../context/AppContext';
import API from "../APIs/API";
import { dateToTimestamp } from "../utils/Utilities";
import { useToasts } from "react-toast-notifications";


export default function CreateProject() {

    const context = useAppContext()
    const algodClient = context["algodClient"]
    const [account, setAccount] = useState()
    const { addToast } = useToasts()

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

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            name: event.target.name.value,
            goal: event.target.goal.value,
            start: event.target.start.value,
            end: event.target.end.value,
            desc: event.target.desc.value,
            image: event.target.image.value,
        }

        if (data.name.length === 0 || data.goal.length === 0 || data.start > data.end) {
            return
        }

        const startTime = dateToTimestamp(data.start)
        const endTime = dateToTimestamp(data.end)

        if (account) {
            try {
                const appId = await createApp(algodClient, account, parseInt(data.goal))
                await setupApp(algodClient, appId, account)
                appId ? await API.createApp(String(appId), account, data.name, data.desc, data.image, startTime, endTime, parseInt(data.goal)) : alert("Transaction failed!")
                addToast("Created app successfully. App ID: " + appId, {
                    appearance: 'success',
                    autoDismiss: true,
                })
            }
            catch (e) {
                addToast("Failed to create app", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        } else { alert("You need to connect your account first") }
    }
    return (
        <div>
            <div>
                <div className="flex justify-center py-4">
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="title text-center mx-auto">
                    <p className="text-4xl text-center font-bold text-gray-800 mb-4">
                        Create your project
                    </p>
                    <p className="text-xl font-medium text-gray-400">
                        Fund now your project through AlgoCrowd platform based on the Algorand Blockchain
                    </p>
                </div>
            </div>
            <div className="flex mt-5 items-center justify-center">
                <div className="grid bg-white rounded-lg w-11/12 md:w-9/12 lg:w-1/2">
                    <form onSubmit={handleSubmit}>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                            <div className="grid grid-cols-1">
                                <label
                                    className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Name</label>
                                <input id="name"
                                    className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    type="text" placeholder="Project name" required />
                            </div>
                            <div className="grid grid-cols-1">
                                <label
                                    className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Goal</label>
                                <input id="goal"
                                    className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    type="number" placeholder="0.00" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                            <div className="grid grid-cols-1">
                                <label
                                    className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Start</label>
                                <input id="start"
                                    className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    type="datetime-local" placeholder="Input 2" required />
                            </div>
                            <div className="grid grid-cols-1">
                                <label
                                    className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">End</label>
                                <input id="end"
                                    className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    type="datetime-local" placeholder="Input 3" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 mt-5 mx-7">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Description</label>
                            <input id="desc"
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                type="text"
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do..." required />
                        </div>

                        <div className="grid grid-cols-1 mt-5 mx-7">
                            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Cover
                                Image URL</label>
                            <div className='flex items-center justify-center w-full'>
                                <input type="text" id="image"
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    name="Image" placeholder="Image URL" required />
                            </div>
                        </div>

                        <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
                            <button type="submit"
                                className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}

