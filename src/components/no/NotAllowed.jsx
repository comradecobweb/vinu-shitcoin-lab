import Center from "@/components/Center";

export default function NotAllowed() {
    return (
        <Center>
            <p>
                Not allowed!!!
            </p>
            <p className={'text-base'}>
                Only the creator of the token can manage it!
            </p>
        </Center>
    )
}