import React, { useEffect, useState } from 'react'
import ProjectsHeader from '../components/ProjectsHeader'
import API from '../APIs/API';
import DisplayProjects from '../components/DisplayProjects';


export default function Home() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false)
  const half = Math.ceil(projects.length / 2);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true)
      const data = await API.getAllApplications()
      setProjects(data)
      setLoading(false)
      console.log(data)
    }

    fetchProjects()
  }, [])

  return (
    <div className="w-full bg-white dark:bg-gray-800">
      <ProjectsHeader title="Latest projects"
        subtitle="The authenticity of every project is verified by our team" />
      {loading ?
        <div className="w-full text-center">
          <div className="flex items-center mx-auto mt-4 py-2 pl-8 px-4 w-64 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p>Loading projects...</p>
          </div>
        </div>
        :
        <>
          {projects.length == 0 ?
            <div className="w-full text-center">
              <div className="flex items-center mx-auto mt-4 py-2 pl-8 px-4 w-64 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                <p>There are no projects to show, create a new amazing one!</p>
              </div>
            </div>
            :
            <div className="flex mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4 bg-white dark:bg-gray-800 pt-2">
              <div className="grid mx-auto grid-cols-1 md:grid-cols-2 gap-12">
                <DisplayProjects projects={projects} />
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}
