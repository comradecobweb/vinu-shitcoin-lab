'use client';
import {useContext, useEffect, useState} from "react";
import {BrowserProvider, ethers} from "ethers";
import {toast} from "@/components/ui/use-toast";
import {isTokenPaused} from "@/lib/lib";
import LoadingButton from "@/components/buttons/LoadingButton";
import {tokenContext} from "@/app/manage/[address]/page";
import {pausedContext} from "@/components/ManageGrid";
import {useEthersSigner} from "@/hooks/useEthers";

export default function PauseButton({className}) {
    const token = useContext(tokenContext);
    const [disabled, setDisabled] = useState(false);
    const [paused, setPaused] = useContext(pausedContext);
    const signer = useEthersSigner();

    useEffect(() => {
        isTokenPaused(token).then(data => setPaused(data));
    }, [setPaused, token]);


    async function onClick() {
        setDisabled(true);

        try {
            const abi = [
                "function pause() external",
                "function unpause() external",
            ];

            let contract = new ethers.Contract(token, abi, signer);


            let tx;

            if (paused) {
                tx = await contract.unpause();
            } else {
                tx = await contract.pause();
            }

            toast({
                title: "Working...",
                description: "Wait for the transaction to be confirmed on the blockchain!",
            });


            await tx.wait();

            if (paused) {
                toast({
                    title: "Unpaused!",
                    description: "You can make transactions again!",
                });
            } else {
                toast({
                    title: "Paused!",
                    description: "You can't make transactions now!",
                });
            }

            setPaused(!paused);
        } catch (e) {
            console.log(e);
            if (e.info.error.code === 4001) {
                toast({
                    title: "Oh no!",
                    description: "You just rejected a transaction!",
                });
            } else {
                toast({
                    title: "Unexpected error!",
                    description: "Something went wrong, but we don't know what.",
                });
            }
        }

        setDisabled(false);
    }


    if (paused) {
        return (
            <LoadingButton loading={disabled} onClick={onClick} className={className}>
                Unpause
            </LoadingButton>
        )
    } else {
        return (
            <LoadingButton loading={disabled} onClick={onClick} className={className}>
                Pause
            </LoadingButton>
        )
    }

}