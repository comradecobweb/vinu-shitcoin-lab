import {toast} from "@/components/ui/use-toast";

export default async function interaction(operation, onSuccess) {
    try {
        const tx = await operation()

        toast({
            title: "Working...",
            description: "Wait for the transaction to be confirmed on the blockchain!",
        });

        await tx.wait();

        await onSuccess()
    } catch (e) {
        console.log(e);

        try {
            toast(e.info.error.code === 4001 ? {
                title: "Oh no!",
                description: "You just rejected a transaction!",
            } : {
                title: "Unexpected error!",
                description: "Something went wrong, but we don't know what.",
            });
        } catch (ee) {
            console.error(ee);
        }
    }
}