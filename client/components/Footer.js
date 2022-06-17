import React from 'react'

export default function Footer() {
    return (
        <div className='py-5'>
            <footer className="bg-white dark:bg-gray-800 w-full pt-5 pb-8">
                <div className="max-w-screen-xl mx-auto px-4">
                    <ul className="max-w-screen-md mx-auto text-lg font-medium flex flex-wrap justify-between">
                        <li className="my-2">
                            <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
                                FAQ
                            </a>
                        </li>
                        <li className="my-2">
                            <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
                                Team
                            </a>
                        </li>
                        <li className="my-2">
                            <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
                                Github
                            </a>
                        </li>
                        <li className="my-2">
                            <a className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                    <div
                        className="text-center text-gray-400 dark:text-gray-200 pt-6 font-medium flex items-center justify-center">
                        Created by AlgoCrowd
                    </div>
                </div>
            </footer>
        </div>
    )
}