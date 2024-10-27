'use client';
import {useEffect, useState} from "react";
import countTokens from "@/app/actions/count-tokens";

export default function Description() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        countTokens().then((data) => setCount(data));
    }, []);

    return (
        <p className={"text-base"}>
            <b>Vinu Shitcoin Lab</b> is a service for creating and managing tokens on the Vinu network.
            It provides great flexibility, and ease, because you don`t need to know how to code to make your
            token. Simply fill out the form and then connect your wallet to deploy your coin. Currently
            <b> {count} </b> tokens have been designed and implemented using this site.
        </p>
    );
}