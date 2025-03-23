'use client'
import useTokenDetails from "@/hooks/useTokenDetails";
import {useEffect, useState} from "react";
import getTokenProperties from "@/actions/token-properties";
import DescribedField from "@/components/DescribedField";

export default function TokenInfoBar({token}) {
    const {name, symbol, decimals} = useTokenDetails(token)
    const [properties, setProperties] = useState({})

    useEffect(() => {
        getTokenProperties(token).then(data => setProperties(data))
    }, [setProperties, token]);

    return (
        <div
            className={'w-full min-w-full  flex flex-row rounded-2xl border-4 p-2 ' +
                'justify-around flex-wrap content-around'}>
            <DescribedField description={"symbol"}>
                {symbol}
            </DescribedField>
            <DescribedField description={"name"}>
                {name}
            </DescribedField>
            <DescribedField description={"decimals"}>
                {decimals}
            </DescribedField>
            {
                properties.pausable &&
                <DescribedField description={"property"}>
                    {'Pausable'}
                </DescribedField>
            }
            {
                properties.burnable &&
                <DescribedField description={"property"}>
                    {'Burnable'}
                </DescribedField>
            }
            {
                properties.mintable &&
                <DescribedField description={"property"}>
                    {'Mintable'}
                </DescribedField>
            }
            {
                properties.ownable &&
                <DescribedField description={"property"}>
                    {'Ownable'}
                </DescribedField>
            }
        </div>
    )
}