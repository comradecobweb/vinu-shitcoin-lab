'use client'
import {useContext} from "react";
import {pausedListingContext} from "@/context/PausedListingContext"
import {listingContext} from "@/components/Listing";
import {Button} from "@/components/ui/button";
import abi from "@/lib/listing-abi";
import useWrite from "@/hooks/useWrite";

export default function PauseListingButton() {
    const [paused, setPaused] = useContext(pausedListingContext)
    const listing = useContext(listingContext)
    const {isFinished, write} = useWrite({
                abi,
                address: listing,
                functionName: 'pause',
            }, (e)=>{console.log(e)}, ()=>{setPaused(true)})

    return <Button disabled={!isFinished} onClick={() => {write()}}>Pause</Button>
}