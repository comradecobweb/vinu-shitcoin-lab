'use client';
import {useContext, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {ethers} from "ethers";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {useRouter} from "next/navigation";
import PausableButton from "@/components/buttons/PausableButton";
import {tokenContext} from "@/app/manage/[address]/page";
import {updateOwner} from "@/actions/check-ownership";
import {pausedContext} from "@/components/ManageGrid";
import useTokenInteractions from "@/hooks/useTokenInteractions";

export default function Transfer() {
    const router = useRouter();
    const token = useContext(tokenContext);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [address, setAddress] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [paused] = useContext(pausedContext);
    const {transferOwnership} = useTokenInteractions(token);

    const formSchema = z.object({
        address: z.string().refine(() => {
            return ethers.isAddress(address);
        }),
    });

    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues:
                {
                    address: "",
                },
        }
    );

    async function onSubmit(values) {
        if (paused) {
            toast({
                title: "Fehler!",
                description: "Sie können die Eigentümerschaft eines pausierten Tokens nicht übertragen!",
            });
            return;
        }
        setAddress(values.address);
        setDialogVisible(true);
    }

    return (
        <Form {...form}>
            <div className={"border-2 p-3 rounded-2xl size-full"}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'size-full'}>
                    <FormField
                        control={form.control}
                        name="address"
                        render={({field}) => (
                            <FormItem className={"size-full flex flex-col justify-around items-center"}>
                                <FormLabel>Eigentümerschaft übertragen</FormLabel>
                                <FormControl>
                                    <Input placeholder="Adresse" {...field} onChange={event => {
                                        field.onChange(event.target.value);
                                        setAddress(event.target.value);
                                    }}/>
                                </FormControl>
                                <FormDescription>
                                    Ändert den Eigentümer des Tokens.
                                </FormDescription>
                                <FormMessage/>
                                <PausableButton loading={buttonDisabled}>
                                    Eigentümerschaft übertragen
                                </PausableButton>
                            </FormItem>
                        )}
                    />
                </form>
            </div>
            <AlertDialog open={dialogVisible} onOpenChange={setDialogVisible}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Eigentümerschaft übertragen</AlertDialogTitle>
                        <AlertDialogDescription>
                            Aufgrund der Eigenschaften des Blockchain-Netzwerks
                            können Sie diese Aktion nicht rückgängig machen.
                            Das bedeutet, dass Sie Ihren Token nicht mehr verwalten können.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {

                            setButtonDisabled(true);
                            await transferOwnership(address, async () => {
                                await updateOwner(address, token);

                                toast({
                                    title: "Token-Eigentümerschaft übertragen!",
                                    description: "Jetzt übernimmt ein neuer Besitzer!",
                                });

                                router.push('/manage');
                            });
                            setButtonDisabled(false);

                        }}>Übertragen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Form>
    )
}