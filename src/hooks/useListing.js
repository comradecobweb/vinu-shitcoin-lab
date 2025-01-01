'use client'
import {useEthersProvider} from "@/hooks/useEthers";
import {ethers} from "ethers";
import {useEffect, useState} from "react";
import abi from "@/lib/listing-abi";

export default function useListing(listing) {
    const provider = useEthersProvider()
    const [owner, setOwner] = useState('')
    const [token, setToken] = useState('')

    useEffect(() => {
        const contract = new ethers.Contract(listing, abi, provider)

        async function fetchOwner() {
            try {
                return await contract.owner()
            } catch (e) {
                return '';
            }
        }

        async function fetchToken() {
            try {
                return await contract.token()
            } catch (e) {
                return '';
            }
        }

        fetchOwner().then(data => setOwner(data))
        fetchToken().then(data => setToken(data))
    }, [listing, setOwner, setToken, provider]);

    return {
        token,
        owner,
    }
}