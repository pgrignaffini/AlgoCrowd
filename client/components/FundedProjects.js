import React from 'react'
import Project from './Project'
import Link from 'next/link'

export default function FundedProjects({ projects }) {

    return (
        <div className="w-1/2 px-6">
            <div className="header text-center mb-10">
                <div className="title  text-center">
                    <p className="text-3xl font-semibold text-gray-800 mb-4">
                        Projects you believed in
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-12">
                {projects.map((project) =>
                (
                    <div key={project.appId}>
                        <Link href={{
                            pathname: `/${encodeURIComponent(project.appId)}`,
                            query: project
                        }}>
                            <a>
                                <Project
                                    appId={project.appId}
                                    title={project.name}
                                    description={project.description}
                                    creator={project.creatorAddress}
                                    end={project.end}
                                    percentage={75} />
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
