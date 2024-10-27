'use client';
import LoadingButton from "@/components/buttons/LoadingButton";

export default function SubmitButton({children, ...props}) {
    return (
        <LoadingButton loading={props.loading} type={"submit"} {...props}>
            {children}
        </LoadingButton>

    );
}