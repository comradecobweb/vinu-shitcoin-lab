'use client'
import {useEthersProvider} from "@/hooks/useEthers";
import {ethers} from "ethers";
import {useEffect, useState} from "react";
import abi from "@/lib/listing-abi";
import erc20abi from "@/lib/erc20-abi";
import {useReadContracts} from "wagmi";

export default function useListing(listing) {
    const provider = useEthersProvider()
    const [owner, setOwner] = useState('')
    const [token, setToken] = useState('')
    const [balance, setBalance] = useState(BigInt(0))
    const [minimalAmount, setMinimalAmount] = useState(BigInt(0))
    const [price, setPrice] = useState(BigInt(0))
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const contract = new ethers.Contract(listing, abi, provider)

        async function fetchToken() {
            try {
                return await contract.token()
            } catch (e) {
                return '';
            }
        }

        fetchToken().then(data => setToken(data))
    }, [listing, setOwner, setToken, provider]);

    const listingContract = {
        address: listing,
        abi: abi,
    }

    const tokenContract = {
        address: token,
        abi: erc20abi,
    }

    const {data, status} = useReadContracts({
        contracts: [
            {
                ...listingContract,
                functionName: 'owner'
            },
            {
                ...listingContract,
                functionName: 'minimalAmount',
            },
            {
                ...listingContract,
                functionName: 'price',
            },
            {
                ...listingContract,
                functionName: 'isPaused',
            },
            {
                ...tokenContract,
                functionName: 'balanceOf',
                args: [
                    listing
                ]
            },
        ],
    })

    useEffect(() => {
        if (status === 'success') {
            setOwner(data[0].result)
            setMinimalAmount(BigInt(data[1].result))
            setPrice(BigInt(data[2].result))
            setIsPaused(Boolean(data[3].result))
            setBalance(BigInt(data[4].result))
        }
    }, [data, status]);

    return {
        token,
        owner,
        balance,
        minimalAmount,
        price,
        isPaused
    }
}