'use server';
import Logo from "@/components/layout/Logo";
import Navigation from "@/components/layout/Navigation";
import {clsx} from "clsx";

export default async function Header({className}) {
    return (
        <div className={clsx(className, "w-full flex flex-col md:flex-row")}>
            <Logo className={"self-center pb-3 md:pb-0"}/>
            <Navigation className={"self-end pt-3 md:pt-0"}/>
        </div>
    )
}