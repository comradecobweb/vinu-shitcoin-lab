'use server'
import {redirect} from 'next/navigation'
import isListing from "@/actions/is-listing";
import Listing from "@/components/Listing";

export default async function Page({params}) {
    const listing = params.address
    if (!await isListing(listing)) redirect('/404')

    return <Listing listing={listing}/>
}