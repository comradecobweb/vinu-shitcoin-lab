'use client';
import getUsersTokens from "@/actions/users-tokens";
import TokenLink from "@/components/TokenLink";
import NoTokens from "@/components/no/NoTokens";
import {useEffect, useState} from "react";

export default function TokenGrid({address}) {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        getUsersTokens(address).then(data => {
            setTokens(data)
        });
    }, [address]);

    return tokens.length === 0 ? <NoTokens/> :
        <div
            className={"h-full w-full grid grid-cols-1 grid-flow-row gap-y-5 overflow-y-auto content-baseline " +
                "items-center sm:grid-cols-2 sm:gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3"}>
            {tokens.map(token => <TokenLink address={token.address} key={token.address}/>)}
        </div>
}