'use client';
import {useContext, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {Label} from "@/components/ui/label";
import PausableButton from "@/components/buttons/PausableButton";
import {tokenContext} from "@/app/manage/[address]/page";
import {updateOwner} from "@/actions/check-ownership";
import {pausedContext} from "@/components/ManageGrid";
import useTokenInteractions from "@/hooks/useTokenInteractions";

export default function Renounce() {
    const token = useContext(tokenContext);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [paused] = useContext(pausedContext);
    const router = useRouter();
    const {renounce} = useTokenInteractions(token);

    return (
        <div className={"border-2 p-3 rounded-2xl flex flex-col size-full justify-around items-center"}>

            <Label
                className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>
                Renounce Ownership
            </Label>

            <p className={"text-sm text-muted-foreground"}>
                Prevents token management
            </p>

            <PausableButton loading={buttonDisabled} className={"w-min"} onClick={async () => {
                if (paused) {
                    toast({
                        title: "Error!",
                        description: "You can't renounce ownership of paused token!",
                    });
                    return;
                }
                setDialogVisible(true);

            }}>
                Renounce ownership
            </PausableButton>

            <AlertDialog open={dialogVisible} onOpenChange={setDialogVisible}>
                <AlertDialogContent className={""}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Renounce ownership</AlertDialogTitle>
                        <AlertDialogDescription>
                            Due to the properties of the blockchain network,
                            you will not be able to undo this action.
                            This means you (and no one other) will no longer be able to manage your token.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {

                            setButtonDisabled(true);
                            await renounce(async () => {
                                await updateOwner('0x0000000000000000000000000000000000000000', token);

                                toast({
                                    title: "Token ownership transferred renounced!",
                                    description: "Now no one can manage the token.",
                                });

                                router.push('/manage');
                            })
                            setButtonDisabled(false);

                        }}>Renounce</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}