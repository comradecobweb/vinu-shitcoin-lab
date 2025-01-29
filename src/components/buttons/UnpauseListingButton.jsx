'use client'
import {useContext} from "react";
import {pausedListingContext} from "@/context/PausedListingContext"
import {listingContext} from "@/context/ListingContext";
import {Button} from "@/components/ui/button";
import abi from "@/lib/listing-abi";
import useWrite from "@/hooks/useWrite";

export default function UnpauseListingButton() {
    const [paused, setPaused] = useContext(pausedListingContext)
    const listing = useContext(listingContext)
    const {isFinished, write} = useWrite(() => {
        setPaused(false)
    })

    return <Button disabled={!isFinished} onClick={() => {
        write({
            abi,
            address: listing,
            functionName: 'unpause',
        })
    }}>Unpause</Button>
}