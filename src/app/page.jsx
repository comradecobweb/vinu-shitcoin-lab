'use server';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Description from "@/components/Description";
import Link from "next/link";

export default async function Home() {
    return (
        <div className={"flex justify-center align-middle h-full"}>
            <div className={"flex flex-col lg:flex-row lg:items-baseline"}>
                <section className={"lg:w-1/2 lg:pr-2 md:flex lg:align-middle"}>
                    <div>
                        <h1 className={"text-2xl mb-3"}>
                            Was ist das?
                        </h1>

                        <Description/>
                    </div>
                </section>

                <section className={"lg:w-1/2 lg:pl-2"}>
                    <h1 className={"text-2xl mt-3 mb-3"}>
                        Häufig gestellte Fragen
                    </h1>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Ist es kostenlos?</AccordionTrigger>
                            <AccordionContent>
                                Nicht ganz. Die Erstellung Ihrer Münze ist kostenlos, aber Sie müssen für die Bereitstellung bezahlen.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Warum Vinu?</AccordionTrigger>
                            <AccordionContent>
                                Vinu Chain ist ein benutzerfreundliches EVM-Netzwerk, das kostenlose Transaktionen ermöglicht.
                                Das macht es ideal für diese Art von Projekt.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Gibt es ein Limit für die Token-Erstellung?</AccordionTrigger>
                            <AccordionContent>
                                Nein! Sie können so viele erstellen, wie Sie möchten!
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Was kann ich mit dem erstellten Token machen?</AccordionTrigger>
                            <AccordionContent>
                                Alles! Ihr Token kann als digitale Währung in Spielen, als Zahlungsmittel in
                                Ihrem Online-Shop oder für andere Zahlungen verwendet werden. Sie sind nur durch Ihre
                                Fantasie begrenzt!
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Wer hat es erstellt?</AccordionTrigger>
                            <AccordionContent>
                                Diese Seite wurde von
                                <Link href={"https://github.com/comradecobweb"}> Comrade Cobweb </Link>
                                mit finanzieller Unterstützung von
                                <Link href={"https://www.vinuchain.org/"}> Vinu Chain</Link> erstellt.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>
        </div>
    );
}
