import React from 'react'
import { sendRefunds } from "../utils/ContractOperations";

export default function ClaimRefundsButton({ client, appID, user, disabled }) {

    refund = async () => {
        sendRefunds(client, appID, user)
    }

    return (
        <>
            <button
                type="button"
                className="m-auto w-48 text-center py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                disabled={disabled}
                onClick={refund}>Get refunded!
            </button>
        </>
    )
}
