'use client'
import {useContext} from "react";
import {pausedListingContext} from "@/context/PausedListingContext"
import UnpauseListingButton from "@/components/buttons/UnpauseListingButton";
import PauseListingButton from "@/components/buttons/PauseListingButton";
import {Label} from "@/components/ui/label";

export default function Pause() {
    const [paused] = useContext(pausedListingContext)

    return (
        <div className={"border-2 p-3 rounded-2xl flex flex-col size-full justify-around items-center"}>
            <Label
                className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>
                Pause
            </Label>
            <p className={"text-center text-sm text-muted-foreground"}>
                Allows you to stop/resume all interactions with the listing.
            </p>
            {paused ? <UnpauseListingButton/> : <PauseListingButton/>}
        </div>
    )
}