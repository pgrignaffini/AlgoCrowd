import React, { useEffect, useState } from 'react'
import Project from '../components/Project'
import ProjectsHeader from '../components/ProjectsHeader'
import API from '../APIs/API';
import Link from 'next/link'
import DisplayProjects from '../components/DisplayProjects';


export default function Projects() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            const data = await API.getAllApplications()
            setProjects(data)
            console.log(data)
        }
        fetchProjects()
    }, [])

    return (
        <div className="w-full mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4 bg-white pt-12">
            <ProjectsHeader />
            <DisplayProjects projects={projects} />
        </div>
    )
}
