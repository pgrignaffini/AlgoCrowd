import React from 'react'

export default function ProjectsHeader() {
    return (
        <div className="header text-center mb-12">
            <div className="title">
                <p className="text-4xl font-bold text-gray-800 mb-4">
                    Latest projects
                </p>
                <p className="text-2xl font-medium text-gray-400">
                    The authenticity of every project is verified by our team
                </p>
            </div>
            <div className="text-center pt-6">
                <form
                    className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center mx-auto">
                    <div className=" relative mx-auto">
                        <input type="text" id="&quot;form-subscribe-Search"
                            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            placeholder="Enter a title" />
                    </div>
                    <button
                        className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                        type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    )
}
