'use client'
import Pause from "@/components/manage-listing/Pause";
import {PausedListingContextProvider} from "@/context/PausedListingContext";
import Deposit from "@/components/manage-listing/Deposit";
import Withdraw from "@/components/manage-listing/Withdraw";

export default function ManageListing() {

    return <div className={"w-full h-full grid" +
        " grid-cols-1 gap-y-5 overflow-y-auto" +
        " sm:grid-cols-2 sm:grid-rows-3 sm:gap-4 sm:content-start" +
        " md:grid-cols-3 md:gap-6  md:content-start md:items-start"}>
        <PausedListingContextProvider>
            <Pause/>
            <Deposit/>
            <Withdraw/>
        </PausedListingContextProvider>
    </div>
}