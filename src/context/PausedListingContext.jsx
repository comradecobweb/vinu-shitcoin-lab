'use client'
import {createContext, useState} from "react";

export const pausedListingContext = createContext(undefined, undefined);

export function PausedListingContextProvider({children}) {
    const [paused, setPaused] = useState(false)

    return <pausedListingContext.Provider value={[paused, setPaused]}>
        {children}
    </pausedListingContext.Provider>
}