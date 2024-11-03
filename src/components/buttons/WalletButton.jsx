'use client'

import {useAppKit} from '@reown/appkit/react'
import {useAppKitAccount} from "@reown/appkit/react";
import {useDisconnect} from '@reown/appkit/react'
import {Button} from "@/components/ui/button";

export default function WalletButton() {
    const {isConnected} = useAppKitAccount()
    const {open} = useAppKit();
    const {disconnect} = useDisconnect()

    if (isConnected) {
        return (
            <Button onClick={disconnect}>
                Disconnect
            </Button>
        )
    } else {
        return <Button onClick={open}>
            Connect
        </Button>
    }

}