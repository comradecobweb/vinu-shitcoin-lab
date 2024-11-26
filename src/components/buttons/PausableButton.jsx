'use client'
import {Button} from "@/components/ui/button";
import {useContext} from "react";
import {pausedContext} from "@/components/ManageGrid";
import {Loader2} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export default function PausableButton({children, loading, className, onClick, type}) {
    const [paused] = useContext(pausedContext);

    if (!paused) {
        return loading ?
            <Button type={type} className={className} disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
            </Button>
            :
            <Button type={type} className={className} onClick={onClick}>
                {children}
            </Button>
    }
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger disabled>
                    <Button type={type} className={className} onClick={onClick} disabled>
                        {children}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Unpause token first!</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}