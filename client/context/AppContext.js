// src/context/state.js
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children, account, isAccountConnected }) {

    let sharedState = { account, isAccountConnected }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}