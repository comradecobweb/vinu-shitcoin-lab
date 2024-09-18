'use server';
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import FloatNavigation from "@/components/layout/FloatNavigation";

export default async function Navigation()
{
    return(
        <>
            <DesktopNavigation className={"hidden md:flex lg:hidden"}/>
            <FloatNavigation className={"md:hidden lg:flex"}/>
        </>
    )
}