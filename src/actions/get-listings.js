'use server'
import db from "@/lib/db";
import {ethers} from "ethers";
import rpcUrl from "@/lib/rpcUrl";

export async function getAllListings() {
    let client;
    try {
        client = await db.connect();
    } catch (err) {
        return null;
    }
    let result;
    try {
        result = await client.query('SELECT * FROM listings;');
    } catch (err) {
        client.release();
        return null;
    }
    client.release();

    return result.rows;
}

export async function getUsersListings(address) {
    if (!address) return [];
    const listings = await getAllListings();

    return listings.filter(async (listing) => {
        try {
            const provider = new ethers.JsonRpcProvider(rpcUrl);
            const abi = ["function owner() public view returns (address)",];
            const contract = new ethers.Contract(address, abi, provider);
            const owner = await contract.owner();

            return owner === address;
        } catch (e) {
            return null;
        }
    });
}