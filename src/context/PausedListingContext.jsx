'use client'
import {createContext, useContext, useEffect, useState} from "react";
import {listingContext} from "@/context/ListingContext";
import useListing from "@/hooks/useListing";

export const pausedListingContext = createContext(undefined, undefined);

// Must be in listing context!!!
export function PausedListingContextProvider({children}) {
    const listing = useContext(listingContext)
    const [paused, setPaused] = useState(false)
    const {isPaused} = useListing(listing)
    useEffect(() => {
         setPaused(isPaused)
    }, [isPaused, setPaused]);

    return <pausedListingContext.Provider value={[paused, setPaused]}>
        {children}
    </pausedListingContext.Provider>
}