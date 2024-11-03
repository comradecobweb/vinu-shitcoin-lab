'use client';


import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react"


export default function ThemeButton({className}) {
    const {resolvedTheme, setTheme} = useTheme();


    return (
        <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className={className}>
            <Sun className={"dark:hidden"}/>
            <Moon className={"hidden dark:block"}/>
        </Button>
    );
}