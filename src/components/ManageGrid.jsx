'use client';
import Mint from "@/components/manage/Mint";
import Burn from "@/components/manage/Burn";
import Pause from "@/components/manage/Pause";
import {createContext, useContext, useEffect, useState} from "react";
import {tokenContext} from "@/app/manage/[address]/page";
import getTokenProperties from "@/actions/token-properties";
import Transfer from "@/components/manage/Transfer";
import Renounce from "@/components/manage/Renounce";
import NothingToManage from "@/components/no/NothingToManage";
import useTokenDetails from "@/hooks/useTokenDetails";

export const pausedContext = createContext(undefined, undefined);

export default function ManageGrid() {
    const token = useContext(tokenContext);
    const [properties, setProperties] = useState({});
    const [paused, setPaused] = useState(false);
    const [empty, setEmpty] = useState(false);
    const {isPaused} = useTokenDetails(token)

    useEffect(() => {
        getTokenProperties(token).then(data => setProperties(data));
    }, [token]);

    useEffect(() => {
        setPaused(isPaused)
    }, [isPaused, token]);

    useEffect(() => {
        if (properties.mintable === false && properties.burnable === false &&
            properties.pausable === false && properties.ownable === false) {
            setEmpty(true);
        }
    }, [properties]);

    return empty ? <NothingToManage/> : <div className={"w-full h-full grid" +
        " grid-cols-1 gap-y-5 overflow-y-auto" +
        " sm:grid-cols-2 sm:grid-rows-3 sm:gap-4 sm:content-start" +
        " md:grid-cols-3 md:gap-6  md:content-start md:items-start"}>
        <pausedContext.Provider value={[paused, setPaused]}>
            {properties.mintable && <Mint/>}
            {properties.burnable && <Burn/>}
            {properties.pausable && <Pause/>}
            {properties.ownable && <Transfer/>}
            {properties.ownable && <Renounce/>}
        </pausedContext.Provider>
    </div>
}