'use server';
import db from '@/lib/db';

export async function getUserID(address) {
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return null;
    }


    let result;
    try {
        result = await client.query({
            text: 'SELECT id FROM accounts WHERE address=$1;',
            values: [address],

        });
    } catch (err) {
        console.log(err);
        client.release();
        return null;
    }

    client.release();


    if (result.rows.length === 0) {
        if (await addUser(address)) {
            return await getUserID(address);
        } else {
            return null;
        }
    } else {
        return result.rows[0].id;
    }
}


async function addUser(address) {
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return false;
    }

    try {
        await client.query({
            text: 'INSERT INTO accounts(address) VALUES ($1);',
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


async function addProperties(properties) {
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return false;
    }

    try {
        await client.query({
            text: 'INSERT INTO properties(pausable, burnable, mintable, ownable) VALUES($1, $2, $3, $4);',
            values: [properties.pausable, properties.burnable, properties.mintable, properties.ownable],
        });
    } catch (err) {
        console.log(err);
        client.release();
        return false;
    }

    client.release();
    return true;
}

async function getPropertiesID(properties) {
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return null;
    }


    let result;
    try {
        result = await client.query({
            text: 'SELECT id FROM properties WHERE pausable=$1 AND burnable=$2 AND mintable=$3 AND ownable=$4;',
            values: [properties.pausable, properties.burnable, properties.mintable, properties.ownable]
        });
    } catch (err) {
        console.log(err);
        client.release();
        return null;
    }

    client.release();


    if (result.rows.length === 0) {
        if (await addProperties(properties)) {
            return await getPropertiesID(properties);
        } else {
            return null;
        }
    } else {
        return result.rows[0].id;
    }
}


export default async function addToken(user, token, properties) {

    const user_id = await getUserID(user);
    const properties_id = await getPropertiesID(properties);


    if (user_id === null || properties_id === null) {
        return false;
    }

    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return false;
    }

    try {
        await client.query({
            text: 'INSERT INTO tokens(address, deployer, properties) VALUES ($1, $2, $3);',
            values: [token, user_id, properties_id]
        });
    } catch (err) {
        console.log(err);
        client.release();
        return false;
    }

    client.release();
    return true;
}