'use client'
import {useContext, useEffect} from "react";
import {pausedListingContext} from "@/components/ManageListing"
import UnpauseListingButton from "@/components/buttons/UnpauseListingButton";
import PauseListingButton from "@/components/buttons/PauseListingButton";

export default function Pause() {
    const [paused] = useContext(pausedListingContext)

    return (
        <>
            {paused ? <UnpauseListingButton/> : <PauseListingButton/>}
        </>
    )
}