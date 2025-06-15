import Center from "@/components/Center";

export default function NotAllowed() {
    return (
        <Center>
            <p>
                Nicht erlaubt!!!
            </p>
            <p className={'text-base'}>
                Nur der Ersteller des Tokens kann ihn verwalten!
            </p>
        </Center>
    )
}