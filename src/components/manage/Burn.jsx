'use client';
import {useContext, useEffect, useState} from "react";
import {getTokenDecimals} from "@/lib/lib";
import {z} from "zod";
import {check, haveEnough} from "@/lib/lib";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import PausableButton from "@/components/buttons/PausableButton";
import {tokenContext} from "@/app/manage/[address]/page";
import {pausedContext} from "@/components/ManageGrid";
import {useAppKitAccount} from "@reown/appkit/react";
import useTokenInteractions from "@/hooks/useTokenInteractions";

export default function Burn() {
    const token = useContext(tokenContext);
    const [amount, setAmount] = useState(1000);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const {address} = useAppKitAccount()
    const [paused] = useContext(pausedContext);
    const [decimals, setDecimals] = useState(18);
    const {burn} = useTokenInteractions(token)

    useEffect(() => {
        getTokenDecimals(token).then(data => setDecimals(data));
    }, [token]);

    const formSchema = z.object({
        amount: z.number().int().min(1, {message: "Value must be at least 1 characters!"}).refine(() => {
            return check(amount, decimals);
        }, {message: "Wrong value!"}).refine(async () => {
            return await haveEnough(address, token, amount);
        }, {message: "You don't have enough tokens!"}),
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
                title: "Error!",
                description: "You can't burn paused token!",
            });
            return;
        }

        setButtonDisabled(true);

        const value = BigInt(values.amount) * (BigInt(10) ** BigInt(decimals));

        await burn(value, async () => {
            toast({
                title: "Burned!",
                description: "Check your wallet!",
            });
        });
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

                                <FormLabel>Burn</FormLabel>
                                <FormControl>
                                    <Input placeholder="burn" type={"number"} {...field}
                                           onChange={event => {
                                               field.onChange(+event.target.value);
                                               setAmount(+event.target.value);
                                           }}/>
                                </FormControl>
                                <FormDescription>
                                    Decreases your token amount.
                                </FormDescription>
                                <FormMessage/>
                                <PausableButton loading={buttonDisabled}>
                                    Burn
                                </PausableButton>
                            </FormItem>
                        )}
                    />
                </form>
            </div>
        </Form>
    )
}