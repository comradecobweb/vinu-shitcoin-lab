'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import {Button} from "@/components/ui/button";
import {useAppKitAccount} from "@reown/appkit/react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import ListingCreationForm from "@/components/ListingCreationForm";

export default function ListingCreation() {
    const { isConnected} = useAppKitAccount()
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {
                        isConnected ? (<Button> + </Button>) :
                            (<TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger disabled>
                                        <Button disabled={true}>
                                            +
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Connect wallet first!</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>)
                    }
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new listing</DialogTitle>
                        <DialogDescription>
                            Listings allow you to sell tokens.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                        <ListingCreationForm/>
                    </DialogBody>
                </DialogContent>
            </Dialog>
        </>
    )
}