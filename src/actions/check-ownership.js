'use server';
import db from "@/lib/db";
import getTokenProperties from "@/actions/token-properties";
import {ethers} from "ethers";
import {getUserID} from "@/actions/add-token";
import rpcUrl from "@/lib/rpcUrl";

async function getOwnerFromChain(address) {
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);

        const abi = [
            "function owner() view returns (address)",
        ];

        let contract = new ethers.Contract(address, abi, provider);

        return String(await contract.owner());
    } catch (e) {
        return null;
    }
}

async function getOwnerFromDB(address) {
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
            text: 'SELECT a.address from tokens t INNER JOIN accounts a ON t.deployer=a.id WHERE t.address = $1;',
            values: [address]
        });
    } catch (err) {
        console.log(err);
        client.release();
        return null;
    }

    client.release();

    if (result.rows.length !== 1) {
        return null;
    } else {
        return result.rows[0].address;
    }
}

export async function updateOwner(new_owner, token) {
    const user_id = await getUserID(new_owner);
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return false;
    }

    try {
        await client.query({
            text: 'UPDATE tokens SET deployer = $1 WHERE address=$2;',
            values: [user_id, token]
        });
    } catch (err) {
        console.log(err);
        client.release();
        return false;
    }

    client.release();
    return true;
}

async function checkDB(user, token) {
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return null;
    }

    let result;
    try {
        result = await
            client.query({
                text: 'SELECT t.id FROM tokens t INNER JOIN accounts a ON t.deployer=a.id WHERE t.address=$1 AND a.address=$2;',
                values: [token, user]
            });
    } catch (err) {
        console.log(err);
        client.release();
        return null;
    }

    client.release();

    return result.rows.length !== 0;
}

export async function AppearsInDB(token) {
    let client;

    try {
        client = await db.connect();
    } catch (err) {
        console.log(err);
        return null;
    }

    let result;
    try {
        result = await
            client.query({
                text: 'SELECT * FROM tokens WHERE address=$1;',
                values: [token]
            });

    } catch (err) {
        console.log(err);
        client.release();
        return null;
    }

    client.release();

    return result.rows.length !== 0;
}

export default async function checkOwnership(user, token) {
    const properties = await getTokenProperties(token);

    if (properties.ownable) {
        const chain = await getOwnerFromChain(token);

        if (chain === null || chain === undefined) {
            return await checkDB(user, token);
        }

        const db = await getOwnerFromDB(token);

        if (chain !== db) {
            await updateOwner(chain, token);
            return await checkOwnership(user, token);
        } else {
            return user === chain;
        }
    } else {
        return await checkDB(user, token);
    }
}