'use client';
import {useContext, useEffect, useState} from "react";
import {toast} from "@/components/ui/use-toast";
import LoadingButton from "@/components/buttons/LoadingButton";
import {tokenContext} from "@/app/manage/[address]/page";
import {pausedContext} from "@/components/ManageGrid";
import useTokenInteractions from "@/hooks/useTokenInteractions";
import useTokenDetails from "@/hooks/useTokenDetails";

export default function PauseButton({className}) {
    const token = useContext(tokenContext);
    const [disabled, setDisabled] = useState(false);
    const [paused, setPaused] = useContext(pausedContext);
    const {isPaused} = useTokenDetails(token)

    useEffect(() => {
        setPaused(isPaused)
    }, [isPaused, setPaused, token]);

    const {pause, unpause} = useTokenInteractions(token);

    async function onClick() {
        setDisabled(true);

        async function onSuccess() {
            toast(paused ? {
                title: "Unpaused!", description: "You can make transactions again!",
            } : {
                title: "Paused!", description: "You can't make transactions now!",
            })
            setPaused(!paused);
        }

        paused ? await unpause(onSuccess) : await pause(onSuccess);
        setDisabled(false);
    }

    return paused ?
        <LoadingButton loading={disabled} onClick={onClick} className={className}>
            Unpause
        </LoadingButton> :
        <LoadingButton loading={disabled} onClick={onClick} className={className}>
            Pause
        </LoadingButton>
}