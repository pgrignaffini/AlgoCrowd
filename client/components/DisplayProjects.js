import React from 'react'
import Project from './Project'

export default function DisplayProjects({ projects, type }) {

    return (
        <>
            {projects?.map((project) =>
            (
                <div key={project.appId}>
                    <Project project={project} type={type} />
                </div>
            ))}
        </>
    )
}
