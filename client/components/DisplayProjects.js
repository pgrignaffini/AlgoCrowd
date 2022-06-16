import React from 'react'
import Link from 'next/link'
import Project from './Project'

export default function DisplayProjects({ projects, type }) {

    return (
        <>
            {projects?.map((project) =>
            (
                <div key={project.appId}>
                    <Link href={{
                        pathname: `/${encodeURIComponent(project.appId)}`,
                        query: project
                    }}>
                        <a>
                            <Project project={project} type={type} />
                        </a>
                    </Link>
                </div>
            ))}
        </>
    )
}
