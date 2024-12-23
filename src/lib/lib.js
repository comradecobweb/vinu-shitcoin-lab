import {maxUint256} from "viem";

export const isDev = process.env.NODE_ENV === 'development';

export function check(amount, decimals) {
    try {
        return (BigInt(amount) * BigInt(10) ** BigInt(decimals)) < maxUint256;
    } catch (err) {
        return false;
    }
}