'use client';
import Link from "next/link";
import DescribedField from "@/components/DescribedField";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {useEthersProvider} from "@/hooks/useEthers";

export default function TokenLink({address}) {

    const provider = useEthersProvider();

    async function getTokenDetails(address) {
        try {
            const abi = [
                "function name() view returns (string)",
                "function symbol() view returns (string)",
                "function decimals() view public returns (uint8)",
            ];

            let contract = new ethers.Contract(address, abi, provider);

            const decimals = Number(await contract.decimals());

            return {
                name: await contract.name(),
                symbol: await contract.symbol(),
                decimals: decimals,
            };
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const [details, setDetails] = useState({});

    useEffect(() => {
        getTokenDetails(address).then(data => {
            setDetails(data)
        });
    }, [address]);

    return (
        <Link href={`/manage/${address}`} className={"h-min w-full min-w-full hover:overflow-auto shrink-0 " +
            "flex flex-row rounded-2xl border-4 p-2 justify-around overflow-hidden"}>
            <DescribedField description={"symbol"}>
                {details?.symbol}
            </DescribedField>

            <DescribedField description={"name"}>
                {details?.name}
            </DescribedField>

            <DescribedField description={"decimals"}>
                {details?.decimals}
            </DescribedField>
        </Link>
    );
}