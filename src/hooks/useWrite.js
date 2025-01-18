'use client'
import {useWriteContract} from "wagmi";
import {useEthersProvider} from "@/hooks/useEthers";
import {useCallback, useState} from "react";

export default function useWrite(values, onError, onSuccess, onSend = undefined) {
    const {writeContractAsync} = useWriteContract()
    const provider = useEthersProvider();
    const [isFinished, setIsFinished] = useState(true)

    const write = useCallback(async () => {
        setIsFinished(false)
        writeContractAsync(values, {onError: onError, onSuccess: onSend}).then(async hash => {
            try {
                const transaction = await provider.getTransaction(hash.toString());
                await transaction.wait()
                await onSuccess()
            } catch (e) {
                await onError(e)
            }
            setIsFinished(true)
        })
    }, [onError, onSend, onSuccess, provider, values, writeContractAsync])

    return {
        isFinished, write
    }
}