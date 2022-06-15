import React from 'react'
import Project from '../components/Project'
import ProjectsHeader from '../components/ProjectsHeader'

export default function Projects() {
    return (
        <div className="w-full mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4 bg-white pt-12">
            <ProjectsHeader />
            <Project title="title" description="desc" creator="creator" end={2} percentage={75} />
        </div>
    )
}
