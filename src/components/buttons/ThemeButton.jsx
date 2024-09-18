'use client';


import {Button} from "@/components/ui/button";
import {useTheme} from "next-themes";
import { Moon, Sun } from "lucide-react"


export default function ThemeButton({className})
{
    const { resolvedTheme, setTheme } = useTheme();
    let icon;


    switch (resolvedTheme)
    {

        case 'light':
            icon = <Sun suppressHydrationWarning/>;
            break;
        case 'dark':
            icon = <Moon suppressHydrationWarning/>;
            break;
    }


    function change()
    {
        if (resolvedTheme==='light')
        {
            setTheme('dark');
        }
        if (resolvedTheme==='dark')
        {
            setTheme('light');
        }
    }

    return(
        <Button onClick={change} className={className} suppressHydrationWarning>
            {icon}
        </Button>
    );
}