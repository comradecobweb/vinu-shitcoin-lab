'use client'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandItem, CommandList} from "cmdk";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Check, ChevronsUpDown} from "lucide-react"
import {useEffect, useState} from "react";
import getTokens from "@/actions/get-tokens";
import {useAppKitAccount} from "@reown/appkit/react";

export function TokensCombobox() {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [tokens, setTokens] = useState([])
    const {address} = useAppKitAccount()

    useEffect(() => {
        getTokens(address).then(data => setTokens(data))
    }, [address]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? tokens.find((token) => token.value === value)?.label
                        : "Select token..."}
                    <ChevronsUpDown className="opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {
                        //<CommandInput placeholder="Search token..." className="h-9"/>
                    }
                    <CommandList>
                        <CommandEmpty>No token found.</CommandEmpty>
                        <CommandGroup>
                            {tokens.map((token) => (
                                <CommandItem
                                    key={token.value}
                                    value={token.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    className={"flex"}
                                >
                                    <p>
                                        {token.label}
                                    </p>
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === token.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}