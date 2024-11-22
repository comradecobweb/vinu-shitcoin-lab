'use server';
import getUsersTokens from "@/actions/users-tokens";
import TokenLink from "@/components/TokenLink";
import {Suspense} from "react";
import Loading from "@/app/loading";
import NoTokens from "@/components/no/NoTokens";

export default async function TokenGrid({address}) {
    if (address !== null && address !== undefined) {
        const tokens = await getUsersTokens(address);

        if (tokens.length === 0) {
            return (
                <NoTokens/>
            );
        } else {
            return (
                <div className={"h-full w-full grid grid-cols-1 grid-flow-row gap-y-5 overflow-y-auto content-baseline "
                    + "items-center sm:grid-cols-2 sm:gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3"}>
                    {
                        tokens.map(token => {
                            return (
                                <Suspense key={token.address} fallback={<Loading/>}>
                                    <TokenLink address={token.address}/>
                                </Suspense>
                            );
                        })
                    }
                </div>
            );
        }
    }
}