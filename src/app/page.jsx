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
                            What is this?
                        </h1>

                        <Description/>
                    </div>


                </section>


                <section className={"lg:w-1/2 lg:pl-2"}>
                    <h1 className={"text-2xl mt-3 mb-3"}>
                        FAQ
                    </h1>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it free?</AccordionTrigger>
                            <AccordionContent>
                                Not exactly. Creation of your coin is free, but you must pay for deploy them.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Why Vinu?</AccordionTrigger>
                            <AccordionContent>
                                Vinu Chain is a friendly EVM network that provides free transactions.
                                This is what makes it great for this type of project.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there any limit on token creation?</AccordionTrigger>
                            <AccordionContent>
                                No! You can create how many you want!
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>What can I do with the token I created?</AccordionTrigger>
                            <AccordionContent>
                                Everything! Your token can be used as digital currency in games, as a means of payment
                                in
                                your
                                online store, or for any other payments. You are only limited by your imagination!
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Who created it?</AccordionTrigger>
                            <AccordionContent>
                                This page was created by
                                <Link href={"https://github.com/comradecobweb"}> Comrade Cobweb </Link>
                                with financial support from
                                <Link href={"https://www.vinuchain.org/"}> Vinu Chain</Link>.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>
        </div>
    );
}
