'use client';
import {Button} from "@/components/ui/button";
import {useAppKit} from "@reown/appkit/react";

export default function ConnectButton() {
    const {open} = useAppKit();
    return (
        <Button onClick={open}>
            Verbinden
        </Button>
    );
}