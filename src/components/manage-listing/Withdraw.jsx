'use client'
import {Label} from "@/components/ui/label";
import WithdrawButton from "@/components/buttons/WithdrawButton";
import {useBalance} from "wagmi";
import {listingContext} from "@/context/ListingContext";
import {useContext} from "react";

export default function Withdraw() {
    const listing = useContext(listingContext)
    const {data} = useBalance({
        address: listing,
        unit: 'ether'
    })

    return (
        <div className={"border-2 p-3 rounded-2xl flex flex-col size-full justify-around items-center"}>
            <Label
                className={"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}>
                Withdraw
            </Label>
            <p className={"text-center text-sm text-muted-foreground"}>
                Balance: {data?.formatted} VC
            </p>
            <WithdrawButton/>
        </div>
    )
}