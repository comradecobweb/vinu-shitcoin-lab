'use client';
import {useContext, useEffect, useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {isTokenPaused} from "@/lib/lib";
import LoadingButton from "@/components/buttons/LoadingButton";
import {tokenContext} from "@/app/manage/[address]/page";
import {pausedContext} from "@/components/ManageGrid";
import useTokenInteractions from "@/hooks/useTokenInteractions";

export default function PauseButton({className}) {
    const token = useContext(tokenContext);
    const [disabled, setDisabled] = useState(false);
    const [paused, setPaused] = useContext(pausedContext);

    useEffect(() => {
        isTokenPaused(token).then(data => setPaused(data));
    }, [setPaused, token]);

    const {pause, unpause} = useTokenInteractions(token);

    async function onClick() {
        setDisabled(true);

        async function onSuccess() {
            toast(paused ? {
                title: "Fortgesetzt!", description: "Sie können wieder Transaktionen durchführen!",
            } : {
                title: "Pausiert!", description: "Sie können jetzt keine Transaktionen durchführen!",
            })
            setPaused(!paused);
        }

        paused ? await unpause(onSuccess) : await pause(onSuccess);

        setDisabled(false);
    }

    return paused ?
        <LoadingButton loading={disabled} onClick={onClick} className={className}>
            Fortsetzen
        </LoadingButton> :
        <LoadingButton loading={disabled} onClick={onClick} className={className}>
            Pausieren
        </LoadingButton>
}