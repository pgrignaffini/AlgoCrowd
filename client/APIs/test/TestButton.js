import API from '../API'

export default function TestButton() {

    async function testAPI() {
        //await API.createApp(1,"addess","name","desc","image","start","end",1)
        let apps = await API.getAllApplications()
        console.log(apps)
        //await API.createApp(2,"x","name","desc","image","start","end",1)
        apps = await API.getApplicationsFromCreatorAddress("x")
        console.log(apps)
    }


    return (
        <>
            <button
                type="button"
                className="m-auto w-48 text-center py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                onClick={testAPI}>Test
            </button>
        </>
    )
}
