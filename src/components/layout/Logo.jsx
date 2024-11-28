'use server';
import {clsx} from "clsx";
import Link from "next/link";

export default async function Logo({className}) {
    return (
        <Link href={'/'} className={clsx(className, "w-min text-4xl font-extrabold text-nowrap")}>
            Vinu Shitcoin Lab
        </Link>
    );
}