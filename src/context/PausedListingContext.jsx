'use client'
import {createContext, useContext, useEffect, useState} from "react";
import {useContractRead} from "wagmi";
import abi from "@/lib/listing-abi";
import {listingContext} from "@/context/ListingContext";

export const pausedListingContext = createContext(undefined, undefined);

// Must be in listing context!!!
export function PausedListingContextProvider({children}) {
    const listing = useContext(listingContext)
    const [paused, setPaused] = useState(false)
    const {data, isSuccess} = useContractRead({
        address: listing,
        abi: abi,
        functionName: 'isPaused',
    })
    useEffect(() => {
        if (isSuccess) setPaused(Boolean(data))
    }, [data, isSuccess, setPaused]);

    return <pausedListingContext.Provider value={[paused, setPaused]}>
        {children}
    </pausedListingContext.Provider>
}