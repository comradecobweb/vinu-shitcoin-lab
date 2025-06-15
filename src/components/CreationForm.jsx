'use client';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Switch} from "@/components/ui/switch";
import {useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {toast} from "@/components/ui/use-toast"
import addToken from "@/actions/add-token";
import SubmitButton from "@/components/buttons/SubmitButton";
import {check} from "@/lib/lib";
import {useEthersSigner} from "@/hooks/useEthers";
import {ContractFactory} from "ethers";
import generateContract from "@/actions/generate-contract";
import {useAppKitAccount} from "@reown/appkit/react";

export default function CreationForm() {

    const [initialSupply, setInitialSupply] = useState(1000);
    const [decimal, setDecimal] = useState(18);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [tokenProperties, setTokenProperties] = useState({});
    const [disabled, setDisabled] = useState(false);

    const {address, isConnected} = useAppKitAccount()
    const signer = useEthersSigner()

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Name muss mindestens 1 Zeichen lang sein!",
        }),
        symbol: z.string().min(1, {
            message: "Symbol muss mindestens 1 Zeichen lang sein!",
        }),
        decimals: z.number().int().nonnegative().max(255, {message: "Dezimalstellen dürfen nicht größer als 255 sein!"}),
        initial_supply: z.number().int().min(1, {message: "Wert muss mindestens 1 sein!"}).refine(() => {
            return check(initialSupply, decimal);
        }, {message: "Falscher Wert!"}),
        pausable: z.boolean(),
        burnable: z.boolean(),
        mintable: z.boolean(),
        ownable: z.boolean()
    });

    async function onSubmit(values) {
        if (!isConnected) {
            toast({
                title: "Keine Wallet erkannt!",
                description: "Sie müssen zuerst Ihre Wallet verbinden!",
                duration: 2000,
            })
        } else {
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

    return (
        <Form {...form}>
            <div className={"size-full"}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={"w-full h-full grid" +
                    " grid-cols-1 gap-y-5 overflow-y-auto" +
                    " sm:grid-cols-2 sm:gap-4 sm:content-start" +
                    " md:grid-cols-3 md:grid-rows-3 md:gap-6  md:content-start md:items-start"}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem className={"border-2 p-3 rounded-2xl size-full"}>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} disabled={disabled}/>
                                </FormControl>
                                <FormDescription>
                                    Dies ist der Name Ihres Tokens.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="symbol"
                        render={({field}) => (
                            <FormItem className={"border-2 p-3 rounded-2xl size-full"}>
                                <FormLabel>Symbol</FormLabel>
                                <FormControl>
                                    <Input placeholder="Symbol" {...field} disabled={disabled}/>
                                </FormControl>
                                <FormDescription>
                                    Dies ist das Symbol Ihres Tokens.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="decimals"
                        render={({field}) => (
                            <FormItem className={"border-2 p-3 rounded-2xl size-full"}>
                                <FormLabel>Dezimalstellen</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dezimalstellen" type={"number"} {...field} disabled={disabled}
                                           onChange={event => {
                                               field.onChange(+event.target.value);
                                               setDecimal(+event.target.value);
                                           }}/>
                                </FormControl>
                                <FormDescription>
                                    Gibt die Anzahl der Dezimalstellen des Tokens an.
                                    Ein Wert von 18 ist in den meisten Fällen geeignet.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="initial_supply"
                        render={({field}) => (
                            <FormItem className={"border-2 p-3 rounded-2xl size-full"}>

                                <FormLabel>Anfangsbestand</FormLabel>
                                <FormControl>
                                    <Input placeholder="Anfangsbestand" type={"number"} {...field}
                                           disabled={disabled}
                                           onChange={event => {
                                               field.onChange(+event.target.value);
                                               setInitialSupply(+event.target.value);
                                           }}/>
                                </FormControl>
                                <FormDescription>
                                    Die anfängliche Menge Ihres Tokens.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pausable"
                        render={({field}) => (
                            <FormItem className={"border-2 p-3 rounded-2xl size-full"}>

                                <FormLabel>Pausierbar?</FormLabel>
                                <FormDescription>
                                    Ermöglicht das Anhalten von Token-Transaktionen (für alle Nutzer).
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
                        render={({field}) => (
                            <FormItem className={"border-2 p-3 rounded-2xl size-full"}>

                                <FormLabel>Brennbar?</FormLabel>
                                <FormDescription>
                                    Ermöglicht es Ihnen, die Anzahl der Tokens in der Zukunft zu verringern.
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
                        render={({field}) => (
                            <FormItem className={"border-2 p-3 rounded-2xl md:order-last size-full"}>

                                <FormLabel>Prägbar?</FormLabel>
                                <FormDescription>
                                    Ermöglicht es Ihnen, die Anzahl der Tokens in der Zukunft zu erhöhen.
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
                        render={({field}) => (
                            <FormItem className={"border-2 p-3 rounded-2xl size-full"}>

                                <FormLabel>Besitzbar?</FormLabel>
                                <FormDescription>
                                    Gibt an, ob der Token den Besitzer wechseln kann.
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
                            Generieren & Bereitstellen
                        </SubmitButton>
                    </div>

                </form>
            </div>

            <AlertDialog open={dialogVisible} onOpenChange={setDialogVisible}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bereitstellen</AlertDialogTitle>
                        <AlertDialogDescription>
                            Aufgrund der Eigenschaften des Blockchain-Netzwerks
                            können Sie diese Aktion nicht rückgängig machen.
                            Das bedeutet, dass Ihr Token nicht gelöscht werden kann.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => {
                            try {
                                setDisabled(true);
                                const contract_source = await generateContract(tokenProperties);

                                const factoryERC20
                                    = new ContractFactory(contract_source.abi, contract_source.bytecode, signer);

                                const contractERC20 = await factoryERC20.deploy();

                                let token_address = await contractERC20.getAddress();

                                toast({
                                    title: "Warten Sie auf die Bereitstellung des Vertrags auf der Blockchain...",
                                    description: "Das sollte nicht lange dauern.",
                                });

                                await contractERC20.waitForDeployment();
                                await addToken(address, token_address, tokenProperties);

                                toast({
                                    title: "Vertrag auf der Blockchain bereitgestellt",
                                    description: "Jetzt können Sie Ihren Token verwenden und verwalten!",
                                });
                                setDisabled(false);

                            } catch (e) {
                                try {
                                    console.log(e);
                                    toast(e.info.error.code === 4001 ? {
                                        title: "Oh nein!",
                                        description: "Sie haben die Transaktion abgelehnt!",
                                    } : {
                                        title: "Unerwarteter Fehler!",
                                        description: "Etwas ist schiefgelaufen, aber wir wissen nicht was.",
                                    });
                                    setDisabled(false);
                                } catch (ee) {
                                    setDisabled(false);
                                }
                            }
                        }}>Bereitstellen</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Form>
    );
}