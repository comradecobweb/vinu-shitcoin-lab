'use client';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import { z } from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "@/components/ui/switch";
import {useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {useWeb3ModalAccount, useWeb3ModalProvider} from "@web3modal/ethers/react";
import {toast} from "@/components/ui/use-toast";
import {BrowserProvider, ContractFactory} from "ethers";
import generateContract from "@/app/actions/generate-contract";
import addToken from "@/app/actions/add-token";
import SubmitButton from "@/components/buttons/SubmitButton";
import {check} from "@/lib/lib";

export default function CreationForm()
{

    const [initialSupply, setInitialSupply] = useState(1000);
    const [decimal, setDecimal] = useState(18);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [tokenProperties, setTokenProperties] = useState({});
    const [disabled, setDisabled] = useState(false);


    const { address, isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();




    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Name must be at least 1 characters!",
        }),
        symbol: z.string().min(1, {
            message: "Symbol must be at least 1 characters!",
        }),
        decimals: z.number().int().nonnegative().max(255, {message: "Decimal cannot be greater than 255!"}),
        initial_supply: z.number().int().min(1, {message:"Value must be at least 1 characters!"}).
        refine(()=>{
            return check(initialSupply, decimal);
        }, {message:"Wrong value!"}),
        pausable: z.boolean(),
        burnable: z.boolean(),
        mintable: z.boolean(),
        ownable: z.boolean()
    });




    async function onSubmit(values) {
        if (!isConnected)
        {
            toast({
                title: "No wallet detected!",
                description: "You must first connect your wallet!",
                duration: 2000,
            })
        }else
        {
            setTokenProperties(values);
            setDialogVisible(true);
        }
    }

    const form = useForm(
        {
            resolver: zodResolver(formSchema),
            defaultValues:
                {
                    name: "Token",
                    symbol: "TKN",
                    decimals: decimal,
                    initial_supply: initialSupply,
                    pausable: false,
                    burnable: false,
                    mintable: false,
                    ownable: false
                },

        }
    );

    return(
            <Form {...form}>
                <div className={"size-full"}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full h-full grid" +
                        " grid-cols-1 gap-y-5 overflow-y-auto" +
                        " sm:grid-cols-2 sm:gap-4 sm:content-start" +
                        " md:grid-cols-3 md:grid-rows-3 md:gap-6  md:content-start md:items-start"}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className={"border-2 p-3 rounded-2xl size-full"}>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} disabled={disabled}/>
                                    </FormControl>
                                    <FormDescription>
                                        This is your token name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="symbol"
                            render={({ field }) => (
                                <FormItem className={"border-2 p-3 rounded-2xl size-full"}>
                                    <FormLabel>Symbol</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Symbol" {...field} disabled={disabled}/>
                                    </FormControl>
                                    <FormDescription >
                                        This is your token symbol.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="decimals"
                            render={({ field }) => (
                                <FormItem className={"border-2 p-3 rounded-2xl size-full"}>
                                    <FormLabel>Decimals</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Decimals" type={"number"} {...field} disabled={disabled}
                                               onChange={event => {
                                                   field.onChange(+event.target.value);
                                                   setDecimal(+event.target.value);
                                               }}/>
                                    </FormControl>
                                    <FormDescription>
                                        Specifies the number of decimal places in the token.
                                        A value of 18 should be good in most cases.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="initial_supply"
                            render={({ field }) => (
                                <FormItem className={"border-2 p-3 rounded-2xl size-full"}>

                                    <FormLabel>Initial supply</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Initial supply" type={"number"} {...field}
                                               disabled={disabled}
                                               onChange={event => {
                                                   field.onChange(+event.target.value);
                                                   setInitialSupply(+event.target.value);
                                               }}/>
                                    </FormControl>
                                    <FormDescription>
                                        The initial amount of your token.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="pausable"
                            render={({ field }) => (
                                <FormItem className={"border-2 p-3 rounded-2xl size-full"}>

                                    <FormLabel>Pausable?</FormLabel>
                                    <FormDescription>
                                        Allows you to stop token transactions (for all users).
                                    </FormDescription>
                                    <FormControl>
                                        <Switch disabled={disabled}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="burnable"
                            render={({ field }) => (
                                <FormItem className={"border-2 p-3 rounded-2xl size-full"}>

                                    <FormLabel>Burnable?</FormLabel>
                                    <FormDescription>
                                        It allows you to reduce the number of tokens in the future.
                                    </FormDescription>
                                    <FormControl>
                                        <Switch disabled={disabled}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mintable"
                            render={({ field }) => (
                                <FormItem className={"border-2 p-3 rounded-2xl md:order-last size-full"}>

                                    <FormLabel>Mintable?</FormLabel>
                                    <FormDescription>
                                        It allows you to increase the number of tokens in the future.
                                    </FormDescription>
                                    <FormControl>
                                        <Switch disabled={disabled}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ownable"
                            render={({ field }) => (
                                <FormItem className={"border-2 p-3 rounded-2xl size-full"}>

                                    <FormLabel>Ownable?</FormLabel>
                                    <FormDescription>
                                        Specifies whether the token can change owner.
                                    </FormDescription>
                                    <FormControl>
                                        <Switch disabled={disabled}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />


                        <div className={"size-full sm:col-span-2 md:col-span-1 flex flex-row justify-center"}>
                            <SubmitButton className={"self-center w-1/2 md:w-full"} loading={disabled}>
                                Generate & Deploy
                            </SubmitButton>
                        </div>

                    </form>
                </div>

                <AlertDialog open={dialogVisible} onOpenChange={setDialogVisible}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Deploy</AlertDialogTitle>
                            <AlertDialogDescription>
                                Due to the properties of the blockchain network,
                                you will not be able to undo this action.
                                This means that your token cannot be deleted.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel >Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={async ()=>{
                                try {
                                    setDisabled(true);

                                    const contract_source = await generateContract(tokenProperties);
                                    const ethersProvider = new BrowserProvider(walletProvider);
                                    const signer = await ethersProvider.getSigner();


                                    const factoryERC20
                                        = new ContractFactory(contract_source.abi, contract_source.bytecode, signer);

                                    const contractERC20 = await factoryERC20.deploy();


                                    let token_address = await contractERC20.getAddress();


                                    toast({
                                        title: "Wait for contract deployment on the blockchain...",
                                        description: "This shouldn't take long.",
                                    });


                                    await contractERC20.waitForDeployment();
                                    await addToken(address, token_address, tokenProperties);

                                    toast({
                                        title: "Contract deployed on the blockchain",
                                        description: "Now Now you can use and manage your token!",
                                    });


                                    setDisabled(false);
                                }catch (e)
                                {
                                    console.log(e);
                                    if (e.info.error.code===4001)
                                    {
                                        toast({
                                            title: "Oh no!",
                                            description: "You just rejected a transaction!",
                                        });
                                    }else
                                    {
                                        toast({
                                            title: "Unexpected error!",
                                            description: "Something went wrong, but we don't know what.",
                                        });
                                    }
                                    setDisabled(false);
                                }
                            }}>Deploy</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Form>
    );
}