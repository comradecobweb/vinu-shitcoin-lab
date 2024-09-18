'use client';
import {Label} from "@/components/ui/label";
import PauseButton from "@/components/buttons/PauseButton";

export default function Pause()
{

    return(
        <div className={"border-2 p-3 rounded-2xl flex flex-col size-full justify-around items-center"}>
            <Label
                className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>
                Pause
            </Label>

            <p className={"text-center text-sm text-muted-foreground"}>
                Allows you to stop/resume all interactions with the token.
            </p>

            <PauseButton className={"w-min"}/>
        </div>
    );
}