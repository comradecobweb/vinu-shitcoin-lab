'use client'
import {createContext, useContext, useEffect, useState} from "react";
import {listingContext} from "@/components/Listing";
import Pause from "@/components/manage-listing/Pause";
import {useContractRead} from "wagmi";
import abi from "@/lib/listing-abi";

export const pausedListingContext = createContext(undefined, undefined);

export default function ManageListing() {
    const listing = useContext(listingContext);
    const [paused, setPaused] = useState(false)
    const {data, isSuccess} = useContractRead({
        address: listing,
        abi: abi,
        functionName: 'isPaused',
    })
    useEffect(() => {
        if (isSuccess) setPaused(Boolean(data))
    }, [data, isSuccess, setPaused]);

    return <div className={""}>
        <pausedListingContext.Provider value={[paused, setPaused]}>
            <Pause/>
        </pausedListingContext.Provider>
    </div>
}