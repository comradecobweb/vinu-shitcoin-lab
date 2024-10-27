'use server';
import {clsx} from "clsx";
import WalletButton from "@/components/buttons/WalletButton";
import ThemeButton from "@/components/buttons/ThemeButton";
import Link from "next/link";

export default async function FloatNavigation({className}) {
    return (
        <div className={clsx(className, 'w-full flex flex-row justify-center lg:justify-end items-center')}>

            <div
                className={"w-full lg:w-1/2 flex flex-row justify-evenly sm:justify-evenly overflow-x-auto items-center"}>

                <Link href={'/create'}>
                    Create
                </Link>

                <Link href={'/manage'}>
                    Manage
                </Link>

                <ThemeButton suspressHydrationWarning/>
                <WalletButton suppressHydrationWarning/>
            </div>

        </div>
    );
}