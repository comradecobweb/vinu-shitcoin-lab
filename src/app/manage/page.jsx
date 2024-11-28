'use client'
import NoWallet from "@/components/no/NoWallet";
import TokenGrid from "@/components/TokenGrid";
import {useAppKitAccount} from "@reown/appkit/react";

export default function Page() {
    const {isConnected, address} = useAppKitAccount()

    return isConnected ? <TokenGrid address={address}/> : <NoWallet/>
}