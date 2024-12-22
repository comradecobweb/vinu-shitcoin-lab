'use server';
import {ethers} from "ethers";
import rpcUrl from "@/lib/rpcUrl";
import getUsersTokens from "@/actions/users-tokens";

async function getTokenLabel(address) {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    try {
        const abi = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
        ];

        const contract = new ethers.Contract(address, abi, provider);

        const name = await contract.name()
        const symbol = await contract.symbol()

        return `${name}\t(${symbol})`
    } catch (e) {
        console.log(e);
        return '';
    }
}

async function parse(data) {
    return await Promise.all(
        data.map(async (item) => {
            return {
                value: item.address,
                label: getTokenLabel(item.address)
            }
        })
    );
}

export default async function getTokens(address) {
    if (!address) return [];

    const tokens = await getUsersTokens(address);
    return await parse(tokens)
}