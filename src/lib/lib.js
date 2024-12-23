export const isDev = process.env.NODE_ENV === 'development';

const uint256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935;

export function check(amount, decimals) {
    try {
        return (BigInt(amount) * BigInt(10) ** BigInt(decimals)) < BigInt(uint256);
    } catch (err) {
        return false;
    }
}