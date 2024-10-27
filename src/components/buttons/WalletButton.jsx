'use client';
import {useDisconnect, useWeb3ModalAccount} from '@web3modal/ethers/react'
import ConnectButton from "@/components/buttons/ConnectButton";
import {Button} from "@/components/ui/button";

export default function WalletButton() {
    const {isConnected} = useWeb3ModalAccount();
    const {disconnect} = useDisconnect();

    if (isConnected) {
        return (<Button onClick={() => disconnect()} suppressHydrationWarning>Disconnect</Button>);
    } else {
        return (<ConnectButton suppressHydrationWarning/>);
    }
}