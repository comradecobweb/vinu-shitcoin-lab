'use client';
import {useWeb3ModalAccount} from "@web3modal/ethers/react";
import NoWallet from "@/components/no/NoWallet";
import ManageGrid from "@/components/ManageGrid";
import {createContext, useEffect, useState} from "react";
import checkOwnership, {AppearsInDB} from "@/actions/check-ownership";
import NotAllowed from "@/components/no/NotAllowed";
import {useRouter} from "next/navigation";

export const tokenContext = createContext(undefined, undefined);


export default function Page({params}) {
    const token = params.address;

    const {address, isConnected} = useWeb3ModalAccount();

    const [allowed, setAllowed] = useState(undefined);

    const router = useRouter();


    useEffect(() => {

        if (address !== null && address !== undefined && isConnected) {
            checkOwnership(address, token).then(raw_allowed => setAllowed(raw_allowed));
        }
    }, [address, isConnected, router, token]);


    useEffect(() => {
        if (!allowed) {
            AppearsInDB(token).then(appears => {
                if (!appears) {
                    router.push('/404');
                }
            });
        }
    }, [token, address, allowed, router]);


    if (!isConnected) {
        return <NoWallet/>
    } else {
        if (allowed) {
            return (
                <tokenContext.Provider value={token}>
                    <ManageGrid/>
                </tokenContext.Provider>
            );
        } else {
            return (
                <NotAllowed/>
            );
        }
    }
}