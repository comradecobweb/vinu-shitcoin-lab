export default function Center({children}) {
    return (
        <div className={"flex justify-center align-middle h-full"}>
            <div className={"self-center text-center text-4xl"}>
                {children}
            </div>
        </div>
    )
}