'use client';
import NoWallet from "@/components/no/NoWallet";
import ManageGrid from "@/components/ManageGrid";
import {createContext, useEffect, useState} from "react";
import checkOwnership, {AppearsInDB} from "@/actions/check-ownership";
import NotAllowed from "@/components/no/NotAllowed";
import {useRouter} from "next/navigation";
import {useAppKitAccount} from "@reown/appkit/react";

export const tokenContext = createContext(undefined, undefined);

export default function Page({params}) {
    const token = params.address;

    const {isConnected, address} = useAppKitAccount()
    const [allowed, setAllowed] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (address && isConnected) {
            checkOwnership(address, token).then(data => setAllowed(data));
        }
    }, [address, isConnected, router, token]);

    useEffect(() => {
        if (!allowed)
            AppearsInDB(token).then(appears => {
                if (!appears) router.push('/404');
            });
    }, [token, address, allowed, router]);

    if (!isConnected) return <NoWallet/>

    return allowed ?
        <tokenContext.Provider value={token}>
            <ManageGrid/>
        </tokenContext.Provider>
        :
        <NotAllowed/>
}