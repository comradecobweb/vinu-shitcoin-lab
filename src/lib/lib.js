import {ethers} from "ethers";

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;

const uint256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

export function check(amount, decimals) {
    try {
        return (BigInt(amount) * BigInt(10) ** BigInt(decimals)) < BigInt(uint256);
    } catch (err) {
        return false;
    }
}


export function getBalance(amount, decimals) {
    return BigInt(amount) / BigInt(10) ** BigInt(decimals);
}


export async function haveEnough(user, token, amount) {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);


        const abi = [
            "function decimals() view public returns (uint8)",
            "function balanceOf(address _owner) public view returns (uint256 balance)"
        ];


        let contract = new ethers.Contract(token, abi, provider);


        const decimals = await contract.decimals();
        const raw_balance = await contract.balanceOf(user);

        const balance = getBalance(raw_balance, decimals);


        return BigInt(balance) >= BigInt(amount);
    } catch (e) {
        console.log(e);
        return null;
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

export async function getTokenDecimals(address) {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        const abi = [
            "function decimals() view public returns (uint8)",
        ];

        let contract = new ethers.Contract(address, abi, provider);

        return Number(await contract.decimals());
    } catch (e) {
        console.log(e);
        return null;
    }
}


export async function getTokenDetails(address) {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        const abi = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function decimals() view public returns (uint8)",
            "function totalSupply() public view returns (uint256)"
        ];


        let contract = new ethers.Contract(address, abi, provider);


        const decimals = Number(await contract.decimals());

        return {
            name: await contract.name(),
            symbol: await contract.symbol(),
            decimals: decimals,
            totalSupply: Number(await getBalance(await contract.totalSupply(), decimals))
        };
    } catch (e) {
        console.log(e);
        return null;
    }
}