import React from 'react'
import DisplayProjects from './DisplayProjects'

export default function FundedProjects({ projects }) {

    return (
        <div className="w-1/2 px-6">
            <div className="header text-center mb-10">
                <div className="title  text-center">
                    <p className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Projects you believed in
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-12">
                <DisplayProjects projects={projects} type="funded" />
            </div>
        </div>
    )
}
