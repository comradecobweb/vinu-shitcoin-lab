'use client'
import {useAppKitAccount} from "@reown/appkit/react";
import useListing from "@/hooks/useListing";
import {useEffect, useState} from "react";
import ManageListing from "@/components/ManageListing";
import BuyTokens from "@/components/BuyTokens";

export default function Listing({listing}) {
    const {address} = useAppKitAccount()
    const {owner} = useListing(listing)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(() => {
        setIsOwner(address === owner)
    }, [address, owner])

    return isOwner ? <ManageListing listing={listing}/> : <BuyTokens listing={listing}/>
}