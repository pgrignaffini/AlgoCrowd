import React from 'react'
import { sendRefunds } from "../utils/ContractOperations";
import { useAppContext } from '../context/AppContext';

export default function ClaimRefundsButton({ appID, disabled }) {

    const context = useAppContext()
    const algodClient = context["algodClient"]

    const refund = async () => {
        const connectedAccount = localStorage.getItem('connectedAccount')
        await sendRefunds(algodClient, parseInt(appID), connectedAccount)
    }

    return (
        <>
            <button
                type="button"
                className="w-auto mt-4 mb-2 py-2 px-4  bg-pink-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg disabled:opacity-25"
                disabled={disabled}
                onClick={refund}>Get refunded!
            </button>
        </>
    )
}
