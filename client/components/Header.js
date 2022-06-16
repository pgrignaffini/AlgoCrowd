import React, { useEffect, useState } from "react";

export default function Header() {

  const [isAccountConnected, setIsAccountConnected] = useState(false)

  useEffect(() => {
    localStorage.theme = "light";
    const isConnected = localStorage.getItem('connectedAccount')
    if (isConnected) setIsAccountConnected(true)
  }, []);

  const connectAlgoSigner = async () => {
    if (typeof AlgoSigner !== "undefined" && typeof window !== 'undefined') {
      await AlgoSigner.connect();
      const account = await getUserAccount();
      localStorage.setItem('connectedAccount', String(account));
      if (account) setIsAccountConnected(true)
    } else {
      alert("This browser doesn't have the required AlgoSigner extension!");
    }
  };

  const getUserAccount = async () => {
    const account = await AlgoSigner.accounts({
      ledger: "TestNet",
    });
    console.log("Connected account: " + account[0]["address"]);
    return account[0]["address"]
  };

  return (
    <nav className="w-full py-6 bg-white w-screen">
      <div className="flex items-center justify-between mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl md:px-2 px-4">
        <section className="flex items-center text-gray-900 space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
              clipRule="evenodd"
            />
          </svg>
          <a
            href=""
            className="font-bold text-xl  outline-none rounded-lg"
          >
            ALGOCROWD
          </a>
        </section>
        <section>
          <ul className="md:space-x-8 space-x-6 text-gray-900 font-semibold hidden md:flex">
            <li className="relative group">
              <a
                href="/project-list"
                className="group outline-none rounded-lg"
              >
                Home
              </a>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
            </li>
            <li className="relative group">
              <a
                href="create-project"
                className="outline-none rounded-lg"
              >
                Create Project
              </a>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
            </li>
            <li className="relative group">
              <a
                href="user-area"
                className="outline-none rounded-lg"
              >
                User Area
              </a>
              <div className="w-full h-0.5 bg-transparent group-hover:bg-purple-500 transition-al absolute bottom-0" />
            </li>
            <li>
              <a
                onClick={connectAlgoSigner}
                className="bg-purple-500 px-4 py-2 rounded-xl text-white hover:bg-purple-400 active:bg-purple-600 focus:ring focus:ring-purple-500 focus:ring-opacity-25 outline-none"
              >
                {isAccountConnected ? "Account connected" : "Connect Account"}
              </a>
            </li>
          </ul>
          <button className="flex md:hidden hover:bg-gray-100 p-2 rounded-full transition-all focus:ring focus:ring-purple-500 focus:ring-opacity-25 active:bg-gray-200 outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </section>
      </div>
    </nav>
  );
}
