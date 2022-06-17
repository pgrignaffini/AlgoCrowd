import Footer from "./footer";

export default function CreateProject() {
    return (
        <div>
            <div>
                <div className="flex justify-center py-4">
                    <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div className="title text-center mx-auto">
                    <p className="text-4xl text-center font-bold text-gray-800 mb-4">
                        Create your project
                    </p>
                    <p className="text-xl font-medium text-gray-400">
                        Fund now your project through AlgoCrowd platform based on the Algorand Blockchain
                    </p>
                </div>
            </div>
            <div className="flex mt-5 items-center justify-center">
                <div className="grid bg-white rounded-lg w-11/12 md:w-9/12 lg:w-1/2">


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                        <div className="grid grid-cols-1">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Name</label>
                            <input
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                type="text" placeholder="Project name" />
                        </div>
                        <div className="grid grid-cols-1">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Goal</label>
                            <input
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                type="number" placeholder="0.00" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                        <div className="grid grid-cols-1">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Start</label>
                            <input
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                type="date" placeholder="Input 2" />
                        </div>
                        <div className="grid grid-cols-1">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">End</label>
                            <input
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                type="date" placeholder="Input 3" />
                        </div>
                        <div className="grid grid-cols-1">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">End</label>
                            <input
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                type="time" placeholder="Input 3" />
                        </div>
                        <div className="grid grid-cols-1">
                            <label
                                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">End</label>
                            <input
                                className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                type="datetime-local" placeholder="Input 3" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label
                            className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">Description</label>
                        <input
                            className="py-2 px-3 rounded-lg border-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                            type="text"
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do..." />
                    </div>

                    <div className="grid grid-cols-1 mt-5 mx-7">
                        <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Cover
                            Photo</label>
                        <div className='flex items-center justify-center w-full'>
                            <label
                                className='flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group'>
                                <div className='flex flex-col items-center justify-center pt-7'>
                                    <svg className="w-10 h-10 text-purple-400 group-hover:text-purple-600" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                    <p className='lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider'>Select
                                        a photo</p>
                                </div>
                                <input type='file' className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className='flex items-center justify-center  md:gap-8 gap-4 pt-5 pb-5'>
                        <button
                            className='w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2'>Create
                        </button>
                    </div>

                </div>
            </div>
            <Footer />
        </div>)
}