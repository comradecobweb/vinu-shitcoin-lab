'use client'
import {useEffect, useState} from "react";
import {useEthersProvider} from "@/hooks/useEthers";
import {ethers} from "ethers";

export default function useTokenDetails(address) {

    const provider = useEthersProvider();
    const [details, setDetails] = useState({});

    useEffect(() => {
        if (!address) return {};

        async function getTokenDetails(address) {
            try {
                const abi = [
                    "function name() view returns (string)",
                    "function symbol() view returns (string)",
                    "function decimals() view public returns (uint8)",
                ];

                let contract = new ethers.Contract(address, abi, provider);

                return {
                    name: await contract.name(),
                    symbol: await contract.symbol(),
                    decimals: Number(await contract.decimals()),
                };
            } catch (e) {
                console.log(e);
                return {};
            }
        }
        getTokenDetails(address).then(data => setDetails(data));
    }, [address, provider]);

    return details;
}