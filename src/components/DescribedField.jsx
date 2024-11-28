import {clsx} from "clsx";

export default function DescribedField({description, children, className}) {
    return (
        <div className={clsx(className, "h-full rounded-xl border-2 p-2 flex flex-col shrink-0")}>

            <p className={"text-lg text-center"}>
                {children}
            </p>

            <p className={"text-xs text-slate-500 text-center md:block "}>
                {description}
            </p>
        </div>
    );
}