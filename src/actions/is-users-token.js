'use server'
import db from "@/lib/db";

export default async function isUsersToken(user, token) {
    if (!token) return false;
    if (!user) return false;

    let client;

    try {
        client = await db.connect();
    } catch (err) {
        return null;
    }

    let result;
    try {
        result = await client.query({
            text: 'SELECT t.id FROM tokens t INNER JOIN accounts a ON t.owner = a.id WHERE a.address = $1 AND t.address = $2;',
            values: [user, token]
        });
    } catch (err) {
        client.release();
        return null;
    }

    client.release();
    return result.rows.length > 0;
}