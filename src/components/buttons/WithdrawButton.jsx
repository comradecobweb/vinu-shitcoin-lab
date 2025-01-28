'use client'
import ListingPausableButton from "@/components/buttons/ListingPausableButton";
import {useBalance} from "wagmi";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useContext} from "react";
import {listingContext} from "@/components/Listing";
import {Button} from "@/components/ui/button";
import useWrite from "@/hooks/useWrite";
import {toast} from "@/components/ui/use-toast";
import abi from "@/lib/erc20-abi";

export default function WithdrawButton() {
    const listing = useContext(listingContext)
    const {data} = useBalance({
        address: listing,
        unit: 'wei'
    })
    const {write, isFinished} = useWrite(() => {
        toast({
                title: 'Success!',
                description: 'You successfully withdrew your VC!'
            }
        )
    })

    if (data && data.value === BigInt(0))
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger disabled>
                        <Button disabled>
                            Withdraw
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>You cannot withdraw 0 VC!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )

    return (
        <ListingPausableButton onClick={() => {
            write({
                abi,
                address: listing,
                functionName: 'withdrawETH'
            })
        }} disabled={!isFinished}>
            Withdraw
        </ListingPausableButton>
    )
}