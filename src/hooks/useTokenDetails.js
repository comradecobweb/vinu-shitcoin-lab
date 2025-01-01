'use client'
import {useEffect, useState} from "react";
import {useEthersProvider} from "@/hooks/useEthers";
import {ethers} from "ethers";

export default function useTokenDetails(address) {
    const provider = useEthersProvider();
    const [details, setDetails] = useState({});

    useEffect(() => {
        async function getTokenDetails(address) {
            try {
                const abi = [
                    "function name() view returns (string)",
                    "function symbol() view returns (string)",
                    "function decimals() view public returns (uint8)",
                    "function paused() view returns (bool)"
                ];

                const contract = new ethers.Contract(address, abi, provider);

                const name = await contract.name()
                const symbol = await contract.symbol()
                const decimals = Number(await contract.decimals())
                let isPaused;

                try {
                    isPaused = Boolean(await contract.paused());
                }catch (e){
                    isPaused = false;
                }

                return{
                    name,
                    symbol,
                    decimals,
                    isPaused
                }
            } catch (e) {
                console.log(e);
                return {};
            }
        }
        getTokenDetails(address).then(data => setDetails(data));
    }, [address, provider]);

    return details;
}