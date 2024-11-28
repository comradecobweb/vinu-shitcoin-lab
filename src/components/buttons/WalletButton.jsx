'use client'
import {useAppKit} from '@reown/appkit/react'
import {useAppKitAccount} from "@reown/appkit/react";
import {useDisconnect} from '@reown/appkit/react'
import {Button} from "@/components/ui/button";

export default function WalletButton() {
    const {isConnected} = useAppKitAccount()
    const {open} = useAppKit();
    const {disconnect} = useDisconnect()

    return isConnected ?
        <Button onClick={disconnect}>
            Disconnect
        </Button> :
        <Button onClick={open}>
            Connect
        </Button>
}