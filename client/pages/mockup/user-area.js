import Footer from "./footer";

export default function UserArea() {
    return (
        <div>
            <div className="flex mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4 bg-white pt-12">
                <div className="w-1/2 px-6">
                    <div className="header text-center mb-10">
                        <div className="title text-center">
                            <p className=" text-3xl font-semibold text-gray-800 mb-4">
                                Your projects
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-12">
                        <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                            <div className="w-full block h-full">
                                <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/1.jpg"
                                    className="max-h-40 w-full object-cover" />
                                <div className="bg-white dark:bg-gray-800 w-full p-4">
                                    <p className="text-indigo-500 text-md font-medium">
                                        Video
                                    </p>
                                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                        Work at home
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                        Work at home, remote, is the new age of the job, every person can work at
                                        home....
                                    </p>

                                    <div>
                                        <div className="bg-white rounded-lg block py-2 m-auto">
                                            <div className="flex items-center mt-4">
                                                <a href="#" className="block relative">
                                                    <img alt="profil"
                                                        src="https://www.tailwind-kit.com/images/person/6.jpg"
                                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
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
                                                    className="ml-64 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-green-400">
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
                                    <div className="w-full text-center">
                                        <button type="button"
                                            className="w-32 mt-4 mb-2 py-2 px-4  bg-gray-300 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                            Claim funds
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                            <div className="w-full block h-full">
                                <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/5.jpg"
                                    className="max-h-40 w-full object-cover" />
                                <div className="bg-white dark:bg-gray-800 w-full p-4">
                                    <p className="text-indigo-500 text-md font-medium">
                                        Sport
                                    </p>
                                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                        Running shoes
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                        Work at home, remote, is the new age of the job, every person can work at
                                        home....
                                    </p>


                                    <div>
                                        <div className="bg-white rounded-lg block py-2 m-auto">
                                            <div className="flex items-center mt-4">
                                                <a href="#" className="block relative">
                                                    <img alt="profil"
                                                        src="https://www.riccardonegri.dev/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fthumb%2Fmen%2F97.jpg&w=96&q=75"
                                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
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
                                                    className="ml-64 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-pink-500">
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
                                        <div className="w-full text-center">
                                            <button type="button"
                                                className="w-32 mt-4 mb-2 py-2 px-4  bg-pink-500 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                                Claim funds
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-1/2 px-6">
                    <div className="header text-center mb-10">
                        <div className="title  text-center">
                            <p className="text-3xl font-semibold text-gray-800 mb-4">
                                Projects you believed in
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-12">
                        <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-full cursor-pointer m-auto">
                            <div className="w-full block h-full">
                                <img alt="blog photo" src="https://www.tailwind-kit.com/images/blog/3.jpg"
                                    className="max-h-40 w-full object-cover" />
                                <div className="bg-white dark:bg-gray-800 w-full p-4">
                                    <p className="text-indigo-500 text-md font-medium">
                                        School
                                    </p>
                                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                        Smart notes
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                        Work at home, remote, is the new age of the job, every person can work at
                                        home....
                                    </p>


                                    <div>
                                        <div className="bg-white rounded-lg block py-2 m-auto">
                                            <div className="flex items-center mt-4">
                                                <a href="#" className="block relative">
                                                    <img alt="profile"
                                                        src="https://www.riccardonegri.dev/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fthumb%2Fmen%2F20.jpg&w=96&q=75"
                                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
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
                                                    className="ml-64 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-green-400">
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
                                    className="max-h-40 w-full object-cover" />
                                <div className="bg-white dark:bg-gray-800 w-full p-4">
                                    <p className="text-indigo-500 text-md font-medium">
                                        Sport
                                    </p>
                                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                        Running shoes
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                        Work at home, remote, is the new age of the job, every person can work at
                                        home....
                                    </p>


                                    <div>
                                        <div className="bg-white rounded-lg block py-2 m-auto">
                                            <div className="flex items-center mt-4">
                                                <a href="#" className="block relative">
                                                    <img alt="profil"
                                                        src="https://www.riccardonegri.dev/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fthumb%2Fmen%2F97.jpg&w=96&q=75"
                                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
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
                                                    className="ml-64 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-pink-500">
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
                                    className="max-h-40 w-full object-cover" />
                                <div className="bg-white dark:bg-gray-800 w-full p-4">
                                    <p className="text-indigo-500 text-md font-medium">
                                        Video
                                    </p>
                                    <p className="text-gray-800 dark:text-white text-xl font-medium mb-2">
                                        Work at home
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-300 font-light font-medium text-md">
                                        Work at home, remote, is the new age of the job, every person can work at
                                        home....
                                    </p>

                                    <div>
                                        <div className="bg-white rounded-lg block py-2 m-auto">
                                            <div className="flex items-center mt-4">
                                                <a href="#" className="block relative">
                                                    <img alt="profil"
                                                        src="https://www.tailwind-kit.com/images/person/6.jpg"
                                                        className="mx-auto object-cover rounded-full h-10 w-10 " />
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
                                                    className="ml-64 text-xs font-medium inline-block py-1 px-2 uppercase rounded-full text-white bg-yellow-500">
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
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}