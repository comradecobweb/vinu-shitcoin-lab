'use client'
import {useWriteContract} from "wagmi";
import {useEthersProvider} from "@/hooks/useEthers";
import {useCallback, useState} from "react";
import {toast} from "@/components/ui/use-toast";

export default function useWrite(onSuccess, onSend = () => {
    toast({
        title: "Working...",
        description: "Wait for the transaction to be confirmed on the blockchain!",
    });
}) {
    const {writeContractAsync} = useWriteContract()
    const provider = useEthersProvider();
    const [isFinished, setIsFinished] = useState(true)

    const write = useCallback(async (values) => {
        setIsFinished(false)
        writeContractAsync(values, {
            onError: (error) => {
                toast(error.name === 'ContractFunctionExecutionError' ? {
                    title: "Oh no!",
                    description: "You just rejected a transaction!",
                } : {
                    title: "Unexpected error!",
                    description: "Something went wrong, but we don't know what.",
                })
                setIsFinished(true)
            }, onSuccess: onSend
        }).then(async hash => {
            try {
                const transaction = await provider.getTransaction(hash.toString());
                await transaction.wait()
                onSuccess()
                setIsFinished(true)
            } catch (error) {
                setIsFinished(true)
                toast({
                    title: "Unexpected error!",
                    description: "Something went wrong, but we don't know what.",
                })
            }
        })
    }, [onSend, onSuccess, provider, writeContractAsync])

    return {
        isFinished, write
    }
}