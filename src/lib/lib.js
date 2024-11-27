import {ethers} from "ethers";
import rpcUrl from "@/lib/rpcUrl";

export const isDev = process.env.NODE_ENV === 'development';

const uint256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

export function check(amount, decimals) {
    try {
        return (BigInt(amount) * BigInt(10) ** BigInt(decimals)) < BigInt(uint256);
    } catch (err) {
        return false;
    }
}

export async function isTokenPaused(token) {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        const abi = [
            "function paused() view returns (bool)"
        ];

        let contract = new ethers.Contract(token, abi, provider);

        return Boolean(await contract.paused());
    } catch (e) {
        console.log(e);
        return false;
    }
}