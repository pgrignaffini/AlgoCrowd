import API from '../API'

export default function TestButton() {

    async function testAPI() {

        //CREATE APPLICATION
        //await API.createApp(1,"addess","name","desc","image","start","end",1)

        //GET ALL CREATED APPLICATIONS
        //let apps = await API.getAllApplications()
        //console.log(apps)

        //GET APPLICATION FROM CREATOR ADDRESS
        //apps = await API.getApplicationsFromCreatorAddress("1")
        //console.log(apps)

        //FUND APPLICATION
        //await API.fundApp("funderAddress", "AppId", 3)

        //GET ALL FUNDED APPLICATIONS FROM FUNDER ADDRESS
        //let fundedApp = await API.getAllFundedApplicationsFromFunderAddress("funderAddress")
        //console.log(fundedApp)

        //GET TOTAL AMOUNT FUNDED FROM A SINGLE FUNDER RELATED TO A SINGLE APP
        //let amount = await API.getFundedApplicationAmountFromFunderAddressAndAppId("funderAddress", "AppId")
        //console.log("The funded amount is: " + amount)

        //GET ALL THE APPLICATIONS THE USER HAS INVESTED IN (AMOUNT INCLUDED) AND RELATED APP INFO
        //let fundedApp = await API.getAllFundedApplicationsAndAppsInfoFromFunderAddress("funderAddress")
        //console.log(fundedApp)

        //GET FUNDED AMOUNT PLUS APP INFO FROM FUNDER ADDRESS RELATED TO A SINGLE APP
        //let fundedApp = await API.getFundedAmountAndAppInfoFromFunderAddressAndAppId("funderAddress", "appId")
        //console.log(fundedApp)

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
