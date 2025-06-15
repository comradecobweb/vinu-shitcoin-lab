'use client';
import ConnectButton from "@/components/buttons/ConnectButton";
import Center from "@/components/Center";

export default function NoWallet() {
    return (
        <Center>
            <p>
                Bitte verbinden Sie Ihre Wallet
            </p>
            <ConnectButton/>
        </Center>
    );
}