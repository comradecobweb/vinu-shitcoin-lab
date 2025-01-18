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
                title: "Error!",
                description: "You can't transfer ownership of paused token!",
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
                                <FormLabel>Transfer ownership</FormLabel>
                                <FormControl>
                                    <Input placeholder="Address" {...field} onChange={event => {
                                        field.onChange(event.target.value);
                                        setAddress(event.target.value);
                                    }}/>
                                </FormControl>
                                <FormDescription>
                                    Changes the owner of the token.
                                </FormDescription>
                                <FormMessage/>
                                <PausableButton loading={buttonDisabled}>
                                    Transfer ownership
                                </PausableButton>
                            </FormItem>
                        )}
                    />
                </form>
            </div>
            <AlertDialog open={dialogVisible} onOpenChange={setDialogVisible}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Transfer ownership</AlertDialogTitle>
                        <AlertDialogDescription>
                            Due to the properties of the blockchain network,
                            you will not be able to undo this action.
                            This means you will no longer be able to manage your token.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {

                            setButtonDisabled(true);
                            await transferOwnership(address, async () => {
                                await updateOwner(address, token);

                                toast({
                                    title: "Token ownership transferred!",
                                    description: "Now a new owner is entering the game!",
                                });

                                router.push('/manage');
                            });
                            setButtonDisabled(false);

                        }}>Transfer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Form>
    )
}