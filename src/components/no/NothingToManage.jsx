import Center from "@/components/Center";

export default function NothingToManage()
{
    return(
        <Center>
            <p>
                Nothing to do!!!
            </p>
            <p className={'text-base'}>
                Your token does not support any management features!
            </p>
        </Center>
    )
}