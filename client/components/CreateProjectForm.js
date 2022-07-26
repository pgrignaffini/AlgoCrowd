import React, { useState } from 'react'
import { createApp, setupApp } from "../utils/ContractOperations";
import API from "../APIs/API";
import { dateToTimestamp } from "../utils/Utilities";
import { useAppContext } from '../context/AppContext';


export default function CreateProjectForm({ addToast }) {

    const context = useAppContext()
    const algodClient = context["algodClient"]
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        const connectedAccount = localStorage.getItem('connectedAccount')

        setLoading(true)
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

        if (connectedAccount) {
            try {
                const appId = await createApp(algodClient, connectedAccount, parseInt(data.goal))
                await setupApp(algodClient, appId, connectedAccount)
                appId ? await API.createApp(String(appId), connectedAccount, data.name, data.desc, data.image, startTime, endTime, parseInt(data.goal)) : alert("Transaction failed!")
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
        setLoading(false)
    }


    return (
        <div>
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

                <div className='flex items-center justify-center md:gap-8 gap-4 pt-5 pb-5'>
                    {loading ?
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                            <path className="opacity-75" fill="purple"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        :
                        ""
                    }
                    <button type="submit" className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}
