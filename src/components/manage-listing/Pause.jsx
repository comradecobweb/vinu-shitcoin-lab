'use client'
import {useContext} from "react";
import {pausedListingContext} from "@/context/PausedListingContext"
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