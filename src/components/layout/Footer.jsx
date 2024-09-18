'use server';
import Link from "next/link";

export default async function Footer()
{
    return(
        <footer className={"text-center self-baseline w-full sticky text-base"}>
            Created by <Link href={"https://github.com/comradecobweb"}>Comrade Cobweb</Link>
        </footer>
    );
}