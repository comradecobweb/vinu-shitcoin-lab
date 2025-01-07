'use server'
import {getAllListings} from "@/actions/get-listings";

export default async function isListing(address) {
    const listings = await getAllListings()
    let result = false
    listings.forEach(item => {
        if (item.address === address) result = true
    })

    return result
}