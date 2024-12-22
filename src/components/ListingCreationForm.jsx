'use client'
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {maxUint256} from "viem";
import isUsersToken from "@/actions/is-users-token";
import {useAppKitAccount} from "@reown/appkit/react";
import {useEthersSigner} from "@/hooks/useEthers";
import {useState} from "react";
import {ContractFactory} from "ethers";
import {toast} from "@/components/ui/use-toast";
import getListingContract from "@/actions/get-listing-contract";
import addListing from "@/actions/add-listing";

export default function ListingCreationForm() {
    const {address} = useAppKitAccount()
    const signer = useEthersSigner()
    const [disabled, setDisabled] = useState(false);

    const formSchema = z.object({
        price: z.bigint().nonnegative().max(maxUint256, {message: "Decimal cannot be greater than uint256!"}),
        token: z.string().refine(async (data) => {
            return isUsersToken(address, data)
        }, {message: 'This token is not available!'})
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: BigInt(10),
            token: '',
        },
    })

    async function onSubmit(values) {
        setDisabled(true);
        try {
            const contract_source = await getListingContract();
            const factory
                = new ContractFactory(contract_source.abi, contract_source.bytecode, signer);
            const contract = await factory.deploy(values.token, values.price.toString());
            const listing_address = await contract.getAddress();

            toast({
                title: "Wait for contract deployment on the blockchain...",
                description: "This shouldn't take long.",
            });

            await contract.waitForDeployment();
            await addListing(listing_address)

            toast({
                title: "Listing created!",
                description: "Now you can sell your token!",
            });
        } catch (e) {
            try {
                console.log(e);
                toast(e.info.error.code === 4001 ? {
                    title: "Oh no!",
                    description: "You just rejected a transaction!",
                } : {
                    title: "Unexpected error!",
                    description: "Something went wrong, but we don't know what.",
                });
                setDisabled(false);
            } catch (ee) {
                setDisabled(false);
            }
        }
        setDisabled(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="price"
                    render={({field: {value, onChange}, fieldState: {error}}) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Price (in wei)" type="bigint" value={value} disabled={disabled}
                                       onChange={(e) => onChange(BigInt(e.target.value))}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="token"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Token address</FormLabel>
                            <FormControl>
                                <Input placeholder="Token address" disabled={disabled} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={disabled}>Submit</Button>
            </form>
        </Form>
    )
}