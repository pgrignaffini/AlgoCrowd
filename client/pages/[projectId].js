import React from 'react'
import { useRouter } from 'next/router'
import FundProject from '../components/FundProject'

export default function ProjectPage() {

    const router = useRouter()
    const project = router.query
    console.log(project)

    return (
        <div>
            <FundProject project={project} />
        </div>
    )
}
