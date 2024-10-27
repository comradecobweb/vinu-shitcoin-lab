'use server';

import {getTokenDetails} from "@/lib/lib";
import Link from "next/link";
import DescribedField from "@/components/DescribedField";

export default async function TokenLink({address}) {
    const details = await getTokenDetails(address);
    if (details !== null) {
        return (

            <Link href={`/manage/${address}`} className={"h-min w-full min-w-full hover:overflow-auto shrink-0 " +
                "flex flex-row rounded-2xl border-4 p-2 justify-around overflow-hidden"}>

                <DescribedField description={"symbol"}>
                    {details.symbol}
                </DescribedField>


                <DescribedField description={"name"}>
                    {details.name}
                </DescribedField>

                <DescribedField description={"decimals"}>
                    {details.decimals}
                </DescribedField>
            </Link>
        );
    } else {
        return (
            <p>
                Error!
            </p>
        )
    }
}