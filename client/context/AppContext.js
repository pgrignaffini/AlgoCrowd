// src/context/state.js
import { createContext, useContext } from 'react';
import { CONSTANTS } from "../constants/Constants";
import algosdk from 'algosdk';

const AppContext = createContext();

export function AppWrapper({ children }) {

    const algodServer = CONSTANTS.baseServer
    const token = CONSTANTS.algodToken // using .env.local to load environment variables
    const port = CONSTANTS.port
    const algodClient = new algosdk.Algodv2(token, algodServer, port);

    let sharedState = { algodClient }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}