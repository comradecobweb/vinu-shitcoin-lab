'use client';
import {useWeb3Modal} from '@web3modal/ethers/react'
import {Button} from "@/components/ui/button";

export default function ConnectButton() {
    const {open} = useWeb3Modal();
    return (
        <Button onClick={() => open()}>
            Connect
        </Button>
    );
}