import db from "@/lib/db";

export default async function addListing(address) {
    if (!address) return false;
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return false;
    }

    try {
        await client.query({
            text: 'INSERT INTO listing(address) VALUES ($1);',
            values: [address]
        });
    } catch (err) {
        console.log(err);
        client.release();
        return false;
    }

    client.release();
    return true;
}