'use server';

import db from "@/lib/db";

export default async function getTokenProperties(address) {
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        return null;
    }


    let result;
    try {
        result = await client.query({
            text: 'SELECT pausable, burnable, mintable, ownable FROM properties p INNER JOIN tokens t ON t.properties = p.id WHERE t.address=$1;',
            values: [address],
        });
    } catch (err) {
        client.release();
        return null;
    }

    client.release();


    return {
        pausable: result.rows[0].pausable,
        burnable: result.rows[0].burnable,
        mintable: result.rows[0].mintable,
        ownable: result.rows[0].ownable,
    };
}