'use client';
import {Button} from "@/components/ui/button";
import {Loader2} from "lucide-react"

export default function LoadingButton({className, type, loading, children, onClick}) {
    return loading ?
        <Button type={type} className={className} disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            Bitte warten
        </Button> :
        <Button type={type} className={className} onClick={onClick}>
            {children}
        </Button>
}