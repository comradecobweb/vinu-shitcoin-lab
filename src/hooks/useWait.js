'use client'
import {useEthersProvider} from "@/hooks/useEthers";

export default function useWait(onSuccess, onError = () => {}) {
    const provider = useEthersProvider();

    async function wait(hash) {
        try {
            const transaction = await provider.getTransaction(hash);
            await transaction.wait()
            await onSuccess()
        } catch (e) {
            onError(e)
        }
    }

    return wait
}