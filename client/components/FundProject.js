import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import { optInApp, sendFunds } from "../utils/ContractOperations";
import API from '../APIs/API';
import Project from './Project';
import ProjectsHeader from './ProjectsHeader';
import { CONSTANTS } from '../constants/Constants';
import { useToasts } from "react-toast-notifications";


export default function FundProject({ project }) {

    const context = useAppContext()
    const algodClient = context["algodClient"]
    const title = `Invest now on project ${project.name}!`
    const [account, setAccount] = useState()
    const { addToast } = useToasts()
    // creators cannot fund their projects
    const isCreator = String(account) === String(project.creatorAddress)
    const now = new Date().getTime()
    const isOver = now > project.end ? true : false

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
        amount -= CONSTANTS.PLATFORM_FEE
        console.log("Amount: " + amount)

        const accountInfo = await algodClient.accountInformation(account).do();
        const isOptedIn = accountInfo["apps-local-state"].filter(app => String(app.id) === project.appId)
        if (!isOptedIn.length) {
            try {
                await optInApp(algodClient, parseInt(project.appId), account)
                addToast("Opt-in successfully", {
                    appearance: 'success',
                    autoDismiss: true,
                })
            }
            catch (e) {
                addToast("Failed to opt-in", {
                    appearance: 'error',
                    autoDismiss: true,
                })
            }
        }

        try {
            await sendFunds(algodClient, parseInt(project.appId), account, amount, addToast)
            await API.fundApp(account, project.appId, amount)
            addToast("Funds sent successfully", {
                appearance: 'success',
                autoDismiss: true,
            })
        }
        catch (e) {
            addToast("Failed to fund project", {
                appearance: 'error',
                autoDismiss: true,
            })
        }

    }


    return (
        <div className="w-full mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4 bg-white pt-12">
            <ProjectsHeader title={title} subtitle="Don't miss your chance" />
            <div className="w-1/2 m-auto">
                <Project project={project} type="none" />
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
                                className="w-32 mt-4 mb-2 py-2 px-4  bg-pink-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg disabled:opacity-25 "
                                disabled={isCreator || isOver}>
                                Send funds
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
