'use server';
import db from "@/lib/db";

export default async function countTokens()
{
    let client;

    try {
        client = await db.connect();
    }catch (err)
    {
        console.log(err);
        return null;
    }


    let result;
    try {
        result = await client.query(`SELECT count(tokens.id) FROM tokens;`);
    }catch (err)
    {
        console.log(err);
        client.release();
        return 0;
    }

    client.release();


    return result.rows[0].count;
}