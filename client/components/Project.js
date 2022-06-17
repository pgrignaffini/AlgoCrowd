import React, { useState, useEffect } from 'react'
import { randomIntFromInterval, calculatePercentage } from '../utils/Utilities'
import ClaimRefundsButton from './ClaimRefundsButton'
import CollectButton from './CollectButton'
import Link from 'next/link'
import { useAppContext } from '../context/AppContext'
import { readGoalFromGlobalState, readTotalFundedFromGlobalState } from '../utils/TxOperations'
import algosdk from 'algosdk'

export default function Project({ project, type }) {

    const context = useAppContext()
    const algodClient = context["algodClient"]
    const [totalInvested, setTotalInvested] = useState()
    const [goal, setGoal] = useState()

    useEffect(() => {
        async function getFundingInfo() {
            let fetchedGoal = await readGoalFromGlobalState(algodClient, parseInt(project.appId))
            fetchedGoal = algosdk.microalgosToAlgos(fetchedGoal)
            setGoal(fetchedGoal)
            let fetchedTotalInvested = await readTotalFundedFromGlobalState(algodClient, parseInt(project.appId))
            fetchedTotalInvested = algosdk.microalgosToAlgos(fetchedTotalInvested)
            setTotalInvested(fetchedTotalInvested)
        }

        getFundingInfo()
    }, [project.appId])

    const now = new Date().getTime()
    const isOver = now > project.end ? true : false
    const status = isOver ? "ended" : "in progress"
    const finish = new Date(parseInt(project.end)).toString()
    const creatorAddress = project.creatorAddress

    const hasReachedGoal = totalInvested >= goal ? true : false

    const displayCreator = creatorAddress.substring(1, 3) + "..." + creatorAddress.substring(project.creatorAddress.length - 12, creatorAddress.length)

    const randomBlogNumber = randomIntFromInterval(1, 6)
    const blogSrc = `https://www.tailwind-kit.com/images/blog/${randomBlogNumber}.jpg`
    const randomPersonNumber = randomIntFromInterval(3, 10)
    const personSrc = `https://www.tailwind-kit.com/images/person/${randomPersonNumber}.jpg`

    const percentage = calculatePercentage(totalInvested, goal)
    const progress = parseInt((percentage * 4) / 100)
    const barProgress = progress === 0 ? `w-0 h-full text-center text-xs text-white bg-green-500 rounded-full` : `w-${progress}/4 h-full text-center text-xs text-white bg-green-500 rounded-full`


    return (
        <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
            <div className="w-full block h-full">
                <Link href={{
                    pathname: `/${encodeURIComponent(project.appId)}`,
                    query: project
                }}>
                    <img alt="blog photo" src={blogSrc}
                        className="max-h-40 w-full object-cover" />
                </Link>
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                        {project.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                        {project.description}
                    </p>

                    <div>
                        <div className="bg-white rounded-lg block py-2 m-auto">
                            <div className="flex items-center mt-4">
                                <a href="#" className="block relative">
                                    <img alt="profil" src={personSrc}
                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                                <div className="flex flex-col justify-between ml-4 text-sm">
                                    <p className="text-gray-400 dark:text-gray-300">
                                        App ID: {project.appId}
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-300">
                                        {displayCreator}
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-300">
                                        Active till {finish}
                                    </p>
                                </div>
                                <span
                                    className="ml-16 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-green-400">
                                    Funding {status}
                                </span>
                            </div>
                            <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                <div
                                    className={barProgress}>
                                    {percentage}%
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-center">
                            {type === "funded" && <ClaimRefundsButton appID={project.appId} disabled={!(isOver && !hasReachedGoal)} />}
                            {type === "created" && <CollectButton appID={project.appId} disabled={!(isOver && hasReachedGoal)} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
