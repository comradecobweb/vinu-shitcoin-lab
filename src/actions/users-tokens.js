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
            text: 'SELECT t.address FROM tokens t INNER JOIN accounts u ON t.deployer = u.id WHERE u.address =$1;',
            values: [address]
        });
    } catch (err) {
        client.release();
        return null;
    }

    client.release();

    return result.rows;
}