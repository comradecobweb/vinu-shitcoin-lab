'use client';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useContext, useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {check} from "@/lib/lib";
import PausableButton from "@/components/buttons/PausableButton";
import {tokenContext} from "@/app/manage/[address]/page";
import {pausedContext} from "@/components/ManageGrid";
import {useAppKitAccount} from "@reown/appkit/react";
import useTokenInteractions from "@/hooks/useTokenInteractions";
import useTokenDetails from "@/hooks/useTokenDetails";

export default function Mint() {
    const token = useContext(tokenContext);
    const [amount, setAmount] = useState(1000);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const {address} = useAppKitAccount();
    const {decimals} = useTokenDetails(token)
    const [paused] = useContext(pausedContext);

    const {mint} = useTokenInteractions(token);

    const formSchema = z.object({
        amount: z.number().int().min(1, {message: "Wert muss mindestens 1 sein!"}).refine(() => {
            return check(amount, decimals);
        }, {message: "Falscher Wert!"}),
    });

    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues:
                {
                    amount: 1000
                },
        }
    );

    async function onSubmit(values) {
        if (paused) {
            toast({
                title: "Fehler!",
                description: "Sie können einen pausierten Token nicht prägen!",
            });
            return;
        }

        setButtonDisabled(true);

        const value = BigInt(values.amount) * (BigInt(10) ** BigInt(decimals));

        await mint(address, value.toString(), async () => {
            toast({
                title: "Geprägt!",
                description: "Überprüfen Sie Ihre Wallet!",
            });
        })

        setButtonDisabled(false);
    }

    return (
        <Form {...form}>
            <div className={"border-2 p-3 rounded-2xl size-full"}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={'size-full'}>
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({field}) => (
                            <FormItem className={"size-full flex flex-col justify-around items-center"}>

                                <FormLabel>Prägen</FormLabel>
                                <FormControl>
                                    <Input placeholder="Prägen" type={"number"} {...field}
                                           onChange={event => {
                                               field.onChange(+event.target.value);
                                               setAmount(+event.target.value);
                                           }}/>
                                </FormControl>
                                <FormDescription>
                                    Erhöht Ihre Token-Menge.
                                </FormDescription>
                                <FormMessage/>
                                <PausableButton loading={buttonDisabled}>
                                    Prägen
                                </PausableButton>
                            </FormItem>
                        )}
                    />
                </form>
            </div>
        </Form>
    )
}