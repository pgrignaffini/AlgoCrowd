import React from 'react'
import { closeCrowdfunding } from "../utils/ContractOperations";

export default function CollectButton({ client, appID, user, disabled }) {

    collect = async () => {
        closeCrowdfunding(client, appID, user)
    }

    return (
        <>
            <button
                type="button"
                className="m-auto w-48 text-center py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                disabled={disabled}
                onClick={collect}>Collect!
            </button>
        </>
    )
}
