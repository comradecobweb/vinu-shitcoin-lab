'use client'
import Pause from "@/components/manage-listing/Pause";
import {PausedListingContextProvider} from "@/context/PausedListingContext";

export default function ManageListing() {

    return <div className={""}>
        <PausedListingContextProvider>
            <Pause/>
        </PausedListingContextProvider>
    </div>
}