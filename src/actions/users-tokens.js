'use server';
import db from "@/lib/db";

export default async function getUsersTokens(address) {
    if (!address) return [];

    let client;

    try {
        client = await db.connect();
    } catch (err) {
        return null;
    }

    let result;
    try {
        result = await client.query({
            text: 'SELECT t.address FROM tokens t INNER JOIN accounts a ON t.owner = a.id WHERE a.address =$1;',
            values: [address]
        });
    } catch (err) {
        client.release();
        return null;
    }

    client.release();

    return result.rows;
}