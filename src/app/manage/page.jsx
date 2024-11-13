'use client'
import NoWallet from "@/components/no/NoWallet";
import {Suspense} from "react";
import TokenGrid from "@/components/TokenGrid";
import Loading from "@/app/loading";
import {useAppKitAccount} from "@reown/appkit/react";

 export default function Page(){
    const {isConnected, address} = useAppKitAccount()


    if (!isConnected) {
        return <NoWallet/>
    } else {
        return (
            <Suspense fallback={<Loading/>}>
                <TokenGrid address={address}/>
            </Suspense>
        );
    }
}