'use client'
import {useEthersSigner} from "@/hooks/useEthers";
import {ethers} from "ethers";
import interaction from "@/lib/interaction"

export default function useTokenInteractions(token_address) {
    const signer = useEthersSigner()

    const abi = [
        "function burn(uint256 value) external",
        "function mint(address to, uint256 amount) external",
        "function pause() external",
        "function unpause() external",
        "function renounceOwnership() external",
        "function transferOwnership(address newOwner) external"
    ]

    const contract = new ethers.Contract(token_address, abi, signer);

    async function pause(onSuccess) {
        await interaction(async () => {
            return await contract.pause();
        }, onSuccess);
    }

    async function unpause(onSuccess) {
        await interaction(async () => {
            return await contract.unpause();
        }, onSuccess);
    }

    async function mint(user_address, value, onSuccess) {
        await interaction(async () => {
            return await contract.mint(user_address, value);
        }, onSuccess);
    }

    async function burn(value, onSuccess) {
        await interaction(async () => {
            return await contract.burn(value);
        }, onSuccess)
    }

    async function renounce(onSuccess) {
        await interaction(async () => {
            return await contract.renounceOwnership();
        }, onSuccess);
    }

    async function transferOwnership(user_address, onSuccess) {
        await interaction(async () => {
            return await contract.transferOwnership(user_address)
        }, onSuccess);
    }

    return {
        pause,
        unpause,
        mint,
        burn,
        renounce,
        transferOwnership
    }
}