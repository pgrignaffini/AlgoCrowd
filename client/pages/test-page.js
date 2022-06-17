import TestButton from "../APIs/test/TestButton";
import { readGoalFromGlobalState, readTotalFundedFromGlobalState } from "../utils/TxOperations";
import { useAppContext } from '../context/AppContext';

export default function TestAPIs() {

    const context = useAppContext()
    const algodClient = context["algodClient"]
    console.log(algodClient)

    async function readState() {
        const t_funded = await readTotalFundedFromGlobalState(algodClient, 95544395)
        const goal = await readGoalFromGlobalState(algodClient, 95544395)
        console.log(t_funded)
        console.log(goal)
    }

    return (
        <>
            <div className="bg-white dark:bg-gray-800 ">
                <TestButton />
            </div>
            <button
                type="button"
                className="m-auto w-48 text-center py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={readState}>Global state
            </button>
        </>

    );
}
