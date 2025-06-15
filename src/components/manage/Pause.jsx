'use client';
import {Label} from "@/components/ui/label";
import PauseButton from "@/components/buttons/PauseButton";

export default function Pause() {

    return (
        <div className={"border-2 p-3 rounded-2xl flex flex-col size-full justify-around items-center"}>
            <Label
                className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>
                Pausieren
            </Label>

            <p className={"text-center text-sm text-muted-foreground"}>
                Ermöglicht das Anhalten/Fortsetzen aller Interaktionen mit dem Token.
            </p>

            <PauseButton className={"w-min"}/>
        </div>
    );
}