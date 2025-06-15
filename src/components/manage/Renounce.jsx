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
                Eigentümerschaft aufgeben
            </Label>

            <p className={"text-sm text-muted-foreground"}>
                Verhindert die Token-Verwaltung
            </p>

            <PausableButton loading={buttonDisabled} className={"w-min"} onClick={async () => {
                if (paused) {
                    toast({
                        title: "Fehler!",
                        description: "Sie können die Eigentümerschaft eines pausierten Tokens nicht aufgeben!",
                    });
                    return;
                }
                setDialogVisible(true);

            }}>
                Eigentümerschaft aufgeben
            </PausableButton>

            <AlertDialog open={dialogVisible} onOpenChange={setDialogVisible}>
                <AlertDialogContent className={""}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eigentümerschaft aufgeben</AlertDialogTitle>
                        <AlertDialogDescription>
                            Aufgrund der Eigenschaften des Blockchain-Netzwerks
                            können Sie diese Aktion nicht rückgängig machen.
                            Das bedeutet, dass Sie (und niemand sonst) den Token nicht mehr verwalten können.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {

                            setButtonDisabled(true);
                            await renounce(async () => {
                                await updateOwner('0x0000000000000000000000000000000000000000', token);

                                toast({
                                    title: "Token-Eigentümerschaft aufgegeben!",
                                    description: "Jetzt kann niemand mehr den Token verwalten.",
                                });

                                router.push('/manage');
                            })
                            setButtonDisabled(false);

                        }}>Aufgeben</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}