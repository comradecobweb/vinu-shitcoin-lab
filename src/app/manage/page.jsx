'use client'
import {useWeb3ModalAccount} from "@web3modal/ethers/react";
import NoWallet from "@/components/no/NoWallet";
import {Suspense} from "react";
import TokenGrid from "@/components/TokenGrid";
import Loading from "@/app/loading";

const Page = async () =>{
    const { address, isConnected } = useWeb3ModalAccount();


    if (!isConnected)
    {
        return <NoWallet/>
    }
    else
    {
        return(
            <Suspense fallback={<Loading/>}>
                <TokenGrid address={address}/>
            </Suspense>
        );
    }
}

export default Page;