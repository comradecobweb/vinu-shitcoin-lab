'use server';
import {clsx} from "clsx";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import WalletButton from "@/components/buttons/WalletButton";
import ThemeButton from "@/components/buttons/ThemeButton";

export default async function DesktopNavigation({className}) {
    return (
        <div className={clsx(className, "w-full flex flex-row justify-evenly sm:justify-end overflow-x-auto")}>
            <NavigationMenu className={"flex flex-row justify-evenly"}>
                <NavigationMenuList>


                    <NavigationMenuItem>
                        <NavigationMenuLink href="/create">
                            Create
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuLink href="/manage">
                            Manage
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <ThemeButton suspressHydrationWarning/>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <WalletButton suppressHydrationWarning/>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}