'use client'
import {useAppKitAccount} from "@reown/appkit/react";
import useListing from "@/hooks/useListing";
import {createContext, useEffect, useState} from "react";
import ManageListing from "@/components/ManageListing";
import BuyTokens from "@/components/BuyTokens";

export const listingContext = createContext(undefined, undefined);

export default function Listing({listing}) {
    const {address} = useAppKitAccount()
    const {owner} = useListing(listing)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        setIsOwner(address === owner)
    }, [address, owner])

    return <listingContext.Provider value={listing}>
        {isOwner ? <ManageListing/> : <BuyTokens/>}
    </listingContext.Provider>
}