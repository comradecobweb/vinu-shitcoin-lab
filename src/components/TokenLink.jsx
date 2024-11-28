'use client';
import Link from "next/link";
import DescribedField from "@/components/DescribedField";
import useTokenDetails from "@/hooks/useTokenDetails";

export default function TokenLink({address}) {
    const {symbol, name, decimals} = useTokenDetails(address);

    return (
        <Link href={`/manage/${address}`} className={"h-min w-full min-w-full hover:overflow-auto shrink-0 " +
            "flex flex-row rounded-2xl border-4 p-2 justify-around overflow-hidden"}>
            <DescribedField description={"symbol"}>
                {symbol}
            </DescribedField>

            <DescribedField description={"name"}>
                {name}
            </DescribedField>

            <DescribedField description={"decimals"}>
                {decimals}
            </DescribedField>
        </Link>
    );
}