import React, { useState, useEffect } from 'react'
import { randomIntFromInterval, calculatePercentage } from '../utils/Utilities'
import ClaimRefundsButton from './ClaimRefundsButton'
import CollectButton from './CollectButton'
import Link from 'next/link'
import { useAppContext } from '../context/AppContext'
import { readGoalFromGlobalState, readTotalFundedFromGlobalState } from '../utils/TxOperations'
import algosdk from 'algosdk'
import { parseISO, format } from 'date-fns'

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
    const status = isOver ? "ended" : "active"
    const finish = format((new Date(parseInt(project.end))), "LLLL d, yyyy - hh:mm")
    const creatorAddress = project.creatorAddress

    const hasReachedGoal = totalInvested >= goal ? true : false

    const displayCreator = creatorAddress ? creatorAddress.substring(1, 3) + "..." + creatorAddress.substring(creatorAddress.length - 12, creatorAddress.length) : ""

    const randomBlogNumber = randomIntFromInterval(1, 6)
    const blogSrc = `https://www.tailwind-kit.com/images/blog/${randomBlogNumber}.jpg`
    const randomPersonNumber = randomIntFromInterval(3, 10)
    const personSrc = `https://www.tailwind-kit.com/images/person/${randomPersonNumber}.jpg`

    const percentage = parseInt(calculatePercentage(totalInvested, goal))
    const progress = parseInt((percentage * 4) / 100)


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
                        <div className="bg-white rounded-lg block py-2 px-2 m-auto">
                            <div className="flex items-center mt-2">
                                <a href="#" className="ml-2 block relative">
                                    <img alt="profil" src={personSrc}
                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                                <div className="flex-col justify-between ml-4 text-sm">
                                    <p className="text-gray-400 dark:text-gray-300">
                                        App ID: {project.appId}
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-300">
                                        Created by: {displayCreator}
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-300">
                                        Active till:  {finish.toString("M/d/yyyy")}
                                    </p>
                                </div>
                                <span
                                    className={"ml-40 relative text-xs font-medium inline-block py-1 px-5 uppercase rounded-full text-white " + (status == 'ended' ? "bg-red-400" : "bg-green-400")}>
                                    {status}
                                </span>
                            </div>
                            <div className="w-full h-4 bg-gray-400 rounded-full mt-3 text-center">
                                <div
                                    className={(progress === 0 ? `w-0` : `w-${progress}/4`) + " text-center h-full text-xs text-white " + (status == 'ended' ? "bg-red-500" : "bg-green-500") + " rounded-full px-1"}>
                                    {!isNaN(percentage) ? (percentage.toString() + "%") : "Ended"}
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
