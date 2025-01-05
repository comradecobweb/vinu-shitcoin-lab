'use client'
import {useEffect, useState} from "react";
import {getAllListings} from "@/actions/get-listings";
import NoListings from "@/components/no/NoListings";
import ListingLink from "@/components/ListingLink";

export default function ListingsGrid() {
    const [listings, setListings] = useState([])
    useEffect(() => {
        getAllListings().then(data => setListings(data))
    }, []);

    return listings.length === 0 ? <NoListings/> :
        <div
            className={"h-full w-full grid grid-cols-1 grid-flow-row gap-y-5 overflow-y-auto content-baseline " +
                "items-center sm:grid-cols-2 sm:gap-4 md:grid-cols-2 md:gap-6"}>
            {listings.map(listing => <ListingLink key={listing.address} address={listing.address}/>)}
        </div>
}