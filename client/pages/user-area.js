import React, { useState, useEffect } from "react";
import API from "../APIs/API";
import FundedProjects from "../components/FundedProjects";
import YourProjects from "../components/YourProjects";


export default function UserArea() {

    const [yourProjects, setYourProjects] = useState([]);
    const [fundedProjects, setFundedProjects] = useState();

    useEffect(() => {

        const connectedAccount = localStorage.getItem('connectedAccount')

        async function fetchYourProjects() {
            const data = await API.getApplicationsFromCreatorAddress(connectedAccount)
            setYourProjects(data)
            console.log(data)
        }

        async function fetchFundedProjects() {
            const data = await API.getAllFundedApplicationsFromFunderAddress(connectedAccount)
            let projects = []
            for (const element of data) {
                let projectInfo = await API.getApplicationFromAppId(element.appId)
                projects.push(...projectInfo)
            }
            setFundedProjects(projects)
        }

        fetchYourProjects()
        fetchFundedProjects()
    }, [])

    return (
        <div className="bg-white dark:bg-gray-800">
            <div className="flex mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4 pt-12">
                <YourProjects projects={yourProjects} />
                <FundedProjects projects={fundedProjects} />
            </div>
        </div>
    )
}