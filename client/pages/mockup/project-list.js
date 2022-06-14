import Footer from "./footer";

export default function ProjectList() {
    return (
        <div>
            <div className="w-full mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4 bg-white pt-12">
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
                                       placeholder="Enter a title"/>
                            </div>
                            <button
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                type="submit">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                        <div className="w-full block h-full">
                            <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/1.jpg"
                                 className="max-h-40 w-full object-cover"/>
                            <div className="bg-white dark:bg-gray-800 w-full p-4">
                                <p className="text-indigo-500 text-md font-medium">
                                    Video
                                </p>
                                <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                    Work at home
                                </p>
                                <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                    Work at home, remote, is the new age of the job, every person can work at home....
                                </p>

                                <div>
                                    <div className="bg-white rounded-lg block py-2 m-auto">
                                        <div className="flex items-center mt-4">
                                            <a href="#" className="block relative">
                                                <img alt="profil" src="https://www.tailwind-kit.com/images/person/6.jpg"
                                                     className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                            </a>
                                            <div className="flex flex-col justify-between ml-4 text-sm">
                                                <p className="text-gray-800 dark:text-white">
                                                    Jean Jacques
                                                </p>
                                                <p className="text-gray-400 dark:text-gray-300">
                                                    10 days left
                                                </p>

                                            </div>
                                            <span
                                                className="ml-16 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-green-400">
                                            Funding in progress
                                        </span>
                                        </div>

                                        <div>

                                        </div>
                                        <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                            <div
                                                className="w-3/4 h-full text-center text-xs text-white bg-green-500 rounded-full">
                                                75%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                        <div className="w-full block h-full">
                            <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/2.jpg"
                                 className="max-h-40 w-full object-cover"/>
                            <div className="bg-white dark:bg-gray-800 w-full p-4">
                                <p className="text-indigo-500 text-md font-medium">
                                    Home
                                </p>
                                <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                    Quick coffee
                                </p>
                                <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
                                </p>


                                <div>
                                    <div className="bg-white rounded-lg block py-2 m-auto">
                                        <div className="flex items-center mt-4">
                                            <a href="#" className="block relative">
                                                <img alt="profil"
                                                     src="https://www.riccardonegri.dev/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fthumb%2Fwomen%2F23.jpg&w=96&q=75"
                                                     className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                            </a>
                                            <div className="flex flex-col justify-between ml-4 text-sm">
                                                <p className="text-gray-800 dark:text-white">
                                                    Eden Li
                                                </p>
                                                <p className="text-gray-400 dark:text-gray-300">
                                                    23 days left
                                                </p>

                                            </div>
                                            <span
                                                className="ml-16 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-green-400">
                                            Funding in progress
                                        </span>
                                        </div>

                                        <div>

                                        </div>
                                        <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                            <div
                                                className="w-1/6 h-full text-center text-xs text-white bg-green-500 rounded-full">
                                                16,67%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                        <div className="w-full block h-full">
                            <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/3.jpg"
                                 className="max-h-40 w-full object-cover"/>
                            <div className="bg-white dark:bg-gray-800 w-full p-4">
                                <p className="text-indigo-500 text-md font-medium">
                                    School
                                </p>
                                <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                    Smart notes
                                </p>
                                <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                    Work at home, remote, is the new age of the job, every person can work at home....
                                </p>


                                <div>
                                    <div className="bg-white rounded-lg block py-2 m-auto">
                                        <div className="flex items-center mt-4">
                                            <a href="#" className="block relative">
                                                <img alt="profil"
                                                     src="https://www.riccardonegri.dev/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fthumb%2Fmen%2F20.jpg&w=96&q=75"
                                                     className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                            </a>
                                            <div className="flex flex-col justify-between ml-4 text-sm">
                                                <p className="text-gray-800 dark:text-white">
                                                    Jessie Gomez
                                                </p>
                                                <p className="text-gray-400 dark:text-gray-300">
                                                    3 days left
                                                </p>

                                            </div>
                                            <span
                                                className="ml-16 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-green-400">
                                            Funding in progress
                                        </span>
                                        </div>

                                        <div>

                                        </div>
                                        <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                            <div
                                                className="w-full h-full text-center text-xs text-white bg-green-500 rounded-full">
                                                248%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                        <div className="w-full block h-full">
                            <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/5.jpg"
                                 className="max-h-40 w-full object-cover"/>
                            <div className="bg-white dark:bg-gray-800 w-full p-4">
                                <p className="text-indigo-500 text-md font-medium">
                                    Sport
                                </p>
                                <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                    Running shoes
                                </p>
                                <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                    Work at home, remote, is the new age of the job, every person can work at home....
                                </p>


                                <div>
                                    <div className="bg-white rounded-lg block py-2 m-auto">
                                        <div className="flex items-center mt-4">
                                            <a href="#" className="block relative">
                                                <img alt="profil"
                                                     src="https://www.riccardonegri.dev/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fthumb%2Fmen%2F97.jpg&w=96&q=75"
                                                     className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                            </a>
                                            <div className="flex flex-col justify-between ml-4 text-sm">
                                                <p className="text-gray-800 dark:text-white">
                                                    Jayden Slawa
                                                </p>
                                                <p className="text-gray-400 dark:text-gray-300">
                                                    0 days left
                                                </p>

                                            </div>
                                            <span
                                                className="ml-16 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-pink-500">
                                            Funding completed
                                        </span>
                                        </div>

                                        <div>

                                        </div>
                                        <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                            <div
                                                className="w-full h-full text-center text-xs text-white bg-pink-500 rounded-full">
                                                178%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                        <div className="w-full block h-full">
                            <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/1.jpg"
                                 className="max-h-40 w-full object-cover"/>
                            <div className="bg-white dark:bg-gray-800 w-full p-4">
                                <p className="text-indigo-500 text-md font-medium">
                                    Video
                                </p>
                                <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                    Work at home
                                </p>
                                <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                    Work at home, remote, is the new age of the job, every person can work at home....
                                </p>

                                <div>
                                    <div className="bg-white rounded-lg block py-2 m-auto">
                                        <div className="flex items-center mt-4">
                                            <a href="#" className="block relative">
                                                <img alt="profil" src="https://www.tailwind-kit.com/images/person/6.jpg"
                                                     className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                            </a>
                                            <div className="flex flex-col justify-between ml-4 text-sm">
                                                <p className="text-gray-800 dark:text-white">
                                                    Jean Jacques
                                                </p>
                                                <p className="text-gray-400 dark:text-gray-300">
                                                    0 days left
                                                </p>

                                            </div>
                                            <span
                                                className="ml-16 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-yellow-500">
                                            Funding not reached
                                        </span>
                                        </div>

                                        <div>

                                        </div>
                                        <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                            <div
                                                className="w-5/6 h-full text-center text-xs text-white bg-yellow-500 rounded-full">
                                                82%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                        <div className="w-full block h-full">
                            <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/2.jpg"
                                 className="max-h-40 w-full object-cover"/>
                            <div className="bg-white dark:bg-gray-800 w-full p-4">
                                <p className="text-indigo-500 text-md font-medium">
                                    Home
                                </p>
                                <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                    Quick coffee
                                </p>
                                <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
                                </p>


                                <div>
                                    <div className="bg-white rounded-lg block py-2 m-auto">
                                        <div className="flex items-center mt-4">
                                            <a href="#" className="block relative">
                                                <img alt="profil"
                                                     src="https://www.riccardonegri.dev/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fthumb%2Fwomen%2F23.jpg&w=96&q=75"
                                                     className="mx-auto object-cover rounded-full h-10 w-10 "/>
                                            </a>
                                            <div className="flex flex-col justify-between ml-4 text-sm">
                                                <p className="text-gray-800 dark:text-white">
                                                    Eden Li
                                                </p>
                                                <p className="text-gray-400 dark:text-gray-300">
                                                    60 days left
                                                </p>

                                            </div>
                                            <span
                                                className="ml-16 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-green-400">
                                            Funding in progress
                                        </span>
                                        </div>

                                        <div>

                                        </div>
                                        <div className="w-full h-4 bg-gray-400 rounded-full mt-3">
                                            <div
                                                className="w-1/6 h-full text-center text-xs text-white bg-green-500 rounded-full">
                                                16,67%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex items-center justify-center">
                        <button type="button"
                                className="w-10 p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                </path>
                            </svg>
                        </button>
                        <button type="button"
                                className="w-10 px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                            1
                        </button>
                        <button type="button"
                                className="w-10 px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                            2
                        </button>
                        <button type="button"
                                className="w-10 px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                            3
                        </button>
                        <button type="button"
                                className="w-10 px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                            4
                        </button>
                        <button type="button"
                                className="w-10 p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    )
}