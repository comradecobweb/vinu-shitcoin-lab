'use client'
import {useEthersProvider} from "@/hooks/useEthers";
import {toast} from "@/components/ui/use-toast";

export default function useWait(onSuccess) {
    const provider = useEthersProvider();
    const isAsync = onSuccess.constructor.name === "AsyncFunction";

    async function wait(hash) {
        try {
            const transaction = await provider.getTransaction(hash);
            await transaction.wait()
            if (isAsync) await onSuccess()
            else onSuccess()
        } catch (e) {
            toast({
                title: "Unexpected error!",
                description: "Something went wrong, but we don't know what.",
            })
        }
    }

    return wait
}