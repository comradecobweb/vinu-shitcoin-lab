'use client'
import useListing from "@/hooks/useListing";
import useTokenDetails from "@/hooks/useTokenDetails";
import {useReadContract} from 'wagmi'
import Link from "next/link";
import DescribedField from "@/components/DescribedField";
import abi from "@/lib/listing-abi";
import {ethers} from "ethers";
import {useCallback, useEffect, useState} from "react";
import BigNumber from "bignumber.js";

export default function ListingLink({address}) {
    const {token} = useListing(address)
    const {name, symbol} = useTokenDetails(token)
    const [price, setPrice] = useState(BigNumber('999999.0000000000001'))
    const {data} = useReadContract({
        abi: abi,
        address: address,
        functionName: 'price',
    })
    useEffect(() => {
        if (data) setPrice(BigNumber(ethers.formatEther(data)))
    }, [data]);

    const getPrice = useCallback(() => {
        if (price.isLessThan(ethers.formatEther(100000))) return '>0.0000000000'
        else if (price.isGreaterThan(ethers.formatEther(99999)) && price.isLessThan(100))
            return price.toFixed(10)
        else if (price.isGreaterThan(9999999999999)) return '>999999999999'
        else {
            const size = price.toString().length - 1 // - 1 because of dot
            const whole_numbers = size + 1 - price.dp()
            // 13 is the longest possible price length for the standard font size
            let fixed = 13 - whole_numbers - 1
            if (fixed < 0) fixed = 0

            return '>' + price.toFixed(fixed)
        }
    }, [price])

    return (
        <Link href={`/listings/${address}`}
              className={"w-full flex flex-row justify-around rounded-2xl border-4 p-2 overflow-hidden"}>
            <DescribedField description={symbol}>
                {name}
            </DescribedField>
            <DescribedField description={"price (in VC)"}>
                {getPrice()}
            </DescribedField>
        </Link>
    )
}