import React, { useState, useEffect } from 'react'
import { randomIntFromInterval, calculatePercentage, convertEpochToSpecificTimezone } from '../utils/Utilities'
import API from '../APIs/API'

export default function Project({ project }) {

    const [totalInvested, setTotalInvested] = useState()

    useEffect(() => {
        async function getAmount() {
            const amount = await API.getFundedAppAmountFromAppId(project.appId)
            if (amount) setTotalInvested(parseFloat(amount.amount))
            else setTotalInvested(0)
        }
        getAmount()
    }, [])

    const now = new Date().getTime()
    const status = now > project.end ? "ended" : "in progress"
    const finish = new Date(parseInt(project.end)).toString()

    const displayCreator = project.creatorAddress.substring(1, 3) + "..." + project.creatorAddress.substring(project.creatorAddress.length - 12, project.creatorAddress.length)

    const randomBlogNumber = randomIntFromInterval(1, 6)
    const blogSrc = `https://www.tailwind-kit.com/images/blog/${randomBlogNumber}.jpg`
    const randomPersonNumber = randomIntFromInterval(3, 10)
    const personSrc = `https://www.tailwind-kit.com/images/person/${randomPersonNumber}.jpg`

    const percentage = calculatePercentage(totalInvested, project.goal)
    const progress = parseInt((percentage * 4) / 100)
    const barProgress = progress === 0 ? `w-0 h-full text-center text-xs text-white bg-green-500 rounded-full` : `w-${progress}/4 h-full text-center text-xs text-white bg-green-500 rounded-full`

    return (
        <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
            <div className="w-full block h-full">
                <img alt="blog photo" src={blogSrc}
                    className="max-h-40 w-full object-cover" />
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

                            <div>

                            </div>
                            <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                <div
                                    className={barProgress}>
                                    {percentage}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
