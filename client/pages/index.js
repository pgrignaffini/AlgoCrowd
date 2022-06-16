import React, { useEffect, useState } from 'react'
import ProjectsHeader from '../components/ProjectsHeader'
import API from '../APIs/API';
import DisplayProjects from '../components/DisplayProjects';


export default function Home() {

  const [projects, setProjects] = useState([]);
  const half = Math.ceil(projects.length / 2);

  useEffect(() => {
    async function fetchProjects() {
      const data = await API.getAllApplications()
      setProjects(data)
      console.log(data)
    }
    fetchProjects()
  }, [])

  return (
    <>
      <ProjectsHeader title="Latest projects" subtitle="The authenticity of every project is verified by our team" />
      <div className="flex mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4 bg-white pt-12">
        <div className="w-1/2 px-6">
          <div className="grid grid-cols-1 gap-12">
            <DisplayProjects projects={projects.slice(0, half)} />
          </div>
        </div>
        <div className="w-1/2 px-6">
          <div className="grid grid-cols-1 gap-12">
            <DisplayProjects projects={projects.slice(-half)} />
          </div>
        </div>
      </div>
    </>
  )
}
