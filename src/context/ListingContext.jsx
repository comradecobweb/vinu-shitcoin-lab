'use client'
import {createContext} from "react";

export const listingContext = createContext(undefined, undefined);

export function ListingContextProvider({children, listing}) {

    return <listingContext.Provider value={listing}>
        {children}
    </listingContext.Provider>
}