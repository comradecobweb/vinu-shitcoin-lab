'use client';
import {useContext} from "react";
import {listingContext} from "@/context/ListingContext";
import useListing from "@/hooks/useListing";
import {useReadContract} from "wagmi";
import abi from "@/lib/erc20-abi";
import ListingPausableButton from "@/components/buttons/ListingPausableButton";
import {z} from "zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import useWrite from "@/hooks/useWrite";
import {toast} from "@/components/ui/use-toast";
import {useAppKitAccount} from "@reown/appkit/react";

export default function Deposit() {
    const listing = useContext(listingContext)
    const {token} = useListing(listing)
    const {address} = useAppKitAccount()
    const {data} = useReadContract({
        abi,
        address: token,
        functionName: 'balanceOf',
        args: [
            address
        ]
    })
    const {isFinished, write} = useWrite(() => {
        toast({
            title: 'Success!',
            description: 'You deposited tokens to your listing!'
        })
    })

    const formSchema = z.object({
        amount: z.number().int().min(1, {message: "Value must be at least 1 characters!"})
            .refine((amount) => {
                return BigInt(amount) <= BigInt(data)
            }, {message: "Not enough tokens!"}),
    });

    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues:
                {
                    amount: data
                },
        }
    )

    function onSubmit(values) {
        write({
            abi,
            address: token,
            functionName: 'transfer',
            args: [
                listing,
                values.amount
            ]
        })
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
                                <FormLabel>Deposit</FormLabel>
                                <FormControl>
                                    <Input placeholder="amount (in wei)" type={"number"} {...field}
                                           onChange={event => field.onChange(+event.target.value)}/>
                                </FormControl>
                                <FormDescription>
                                    Allows you to deposit tokens to your contract.
                                </FormDescription>
                                <FormMessage/>
                                <ListingPausableButton loading={!isFinished}>
                                    Deposit
                                </ListingPausableButton>
                            </FormItem>
                        )}
                    />
                </form>
            </div>
        </Form>
    )
}