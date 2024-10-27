'use client';
import {useContext, useEffect, useState} from "react";
import {useWeb3ModalAccount, useWeb3ModalProvider} from "@web3modal/ethers/react";
import {getTokenDecimals} from "@/lib/lib";
import {z} from "zod";
import {check, haveEnough} from "@/lib/lib";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BrowserProvider, ethers} from "ethers";
import {toast} from "@/components/ui/use-toast";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import PausableButton from "@/components/buttons/PausableButton";
import {tokenContext} from "@/app/manage/[address]/page";
import {pausedContext} from "@/components/ManageGrid";

export default function Burn() {

    const token = useContext(tokenContext);
    const [amount, setAmount] = useState(1000);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const {walletProvider} = useWeb3ModalProvider();
    const {address} = useWeb3ModalAccount();
    const [paused] = useContext(pausedContext);

    const [decimals, setDecimals] = useState(18);

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


        try {
            setButtonDisabled(true);


            const provider = new BrowserProvider(walletProvider);
            const signer = await provider.getSigner()

            const abi = ["function burn(uint256 value) external"];

            let contract = new ethers.Contract(token, abi, signer);

            const final = BigInt(values.amount) * (BigInt(10) ** BigInt(decimals));

            let tx = await contract.burn(final.toString());

            toast({
                title: "Working...",
                description: "Wait for the transaction to be confirmed on the blockchain!",
            });


            await tx.wait();

            toast({
                title: "Burned!",
                description: "Check your wallet!",
            });


            setButtonDisabled(false);
        } catch (e) {
            console.log(e);
            if (e.info.error.code === 4001) {
                toast({
                    title: "Oh no!",
                    description: "You just rejected a transaction!",
                });
            } else {
                toast({
                    title: "Unexpected error!",
                    description: "Something went wrong, but we don't know what.",
                });
            }
            setButtonDisabled(false);
        }
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