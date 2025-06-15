'use client';
import {useEffect, useState} from "react";
import countTokens from "@/actions/count-tokens";

export default function Description() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        countTokens().then((data) => setCount(data));
    }, []);

    return (
        <p>
            <b>Vinu Shitcoin Lab</b> ist ein Service zur Erstellung und Verwaltung von Tokens im Vinu-Netzwerk.
            Es bietet große Flexibilität und Einfachheit, da Sie keine Programmierkenntnisse benötigen, um Ihren
            Token zu erstellen. Füllen Sie einfach das Formular aus und verbinden Sie dann Ihre Wallet, um Ihre Münze bereitzustellen. Aktuell
            wurden <b> {count} </b> Token mit dieser Seite entworfen und implementiert.
        </p>
    );
}