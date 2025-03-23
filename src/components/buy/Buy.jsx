'use client'
import {useContext} from "react";
import {listingContext} from "@/context/ListingContext";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useBalance} from "wagmi";
import useListing from "@/hooks/useListing";
import {useAppKitAccount} from "@reown/appkit/react";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import ListingPausableButton from "@/components/buttons/ListingPausableButton";
import useWrite from "@/hooks/useWrite";
import {toast} from "@/components/ui/use-toast";
import abi from "@/lib/listing-abi";

export default function Buy() {
    const listing = useContext(listingContext)
    const {balance, minimalAmount, price} = useListing(listing)
    const {address} = useAppKitAccount()
    const {data} = useBalance({
        address: address,
        unit: 'wei'
    })

    const {isFinished, write} = useWrite(() => {
        toast({
            title: 'Success!',
            description: 'You bought some token!'
        })
    });

    const formSchema = z.object({
        amount: z.bigint().min(BigInt(1), {message: "Value must be at least 1 characters!"})
            .refine((amount) => {
                return amount >= minimalAmount
            }, {message: "You can't buy so few tokens!"})
            .refine((amount)=>{

            }, {message: ""})
    });

    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues:
                {
                    amount: 0
                },
        }
    )

    function onSubmit(values) {
        console.log(values)
        write({
            abi,
            address: listing,
            functionName: 'purchase',
            value: 0,
            args: [
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
                                <FormLabel>Buy</FormLabel>
                                <FormControl>
                                    <Input placeholder="amount (in wei)" type={"number"} {...field}
                                           onChange={event => field.onChange(BigInt(event.target.value))}/>
                                </FormControl>
                                <FormDescription>
                                    Allows you to buy tokens.
                                </FormDescription>
                                <FormMessage/>
                                <ListingPausableButton loading={!isFinished}>
                                    Buy
                                </ListingPausableButton>
                            </FormItem>
                        )}
                    />
                </form>
            </div>
        </Form>
    )
}