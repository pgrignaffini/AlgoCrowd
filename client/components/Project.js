import React from 'react'
import { randomIntFromInterval } from '../utils/Utilities'

export default function Project({ title, description, creator, end, percentage }) {

    const now = new Date().getTime()
    const status = now > end ? "ended" : "in progress"
    const timeLeft = end - now

    const randomBlogNumber = randomIntFromInterval(1, 6)
    const blogSrc = `https://www.tailwind-kit.com/images/blog/${randomBlogNumber}.jpg`
    const randomPersonNumber = randomIntFromInterval(1, 10)
    const personSrc = `https://www.tailwind-kit.com/images/person/${randomPersonNumber}.jpg`

    return (
        <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
            <div className="w-full block h-full">
                <img alt="blog photo" src={blogSrc}
                    className="max-h-40 w-full object-cover" />
                <div className="bg-white dark:bg-gray-800 w-full p-4">
                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                        {title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                        {description}
                    </p>

                    <div>
                        <div className="bg-white rounded-lg block py-2 m-auto">
                            <div className="flex items-center mt-4">
                                <a href="#" className="block relative">
                                    <img alt="profil" src={personSrc}
                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
                                </a>
                                <div className="flex flex-col justify-between ml-4 text-sm">
                                    <p className="text-gray-800 dark:text-white">
                                        {creator}
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-300">
                                        {timeLeft} days left
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
                                    className="w-3/4 h-full text-center text-xs text-white bg-green-500 rounded-full">
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
