import {Inter} from "next/font/google";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import {clsx} from "clsx";
import {Toaster} from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import {ThemeProvider} from "@/app/context/theme-provider";
import ContextProvider from "@/app/context/ContextProvider";
import {headers} from "next/headers";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Vinu Shitcoin Lab",
    description: "The best token creation tool in Vinu Chain!",
    keywords: "Vinu, tokens, shitcoins, ERC-20, Comrade Cobweb"
};

export default function RootLayout({children}) {
    const cookies = headers().get('cookie')
    return (
        <html lang="en" className={"h-svh w-svw min-h-full min-w-full p-5"}>
        <body className={clsx(inter.className, "flex flex-col w-full h-full overflow-hidden")}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>

            <Header className={"mt-2 mb-2"}/>
            <div className={"self-stretch h-full flex justify-center overflow-y-auto mt-5 mb-5"}>
                <div className={"w-full h-full sm:w-5/6 lg:w-4/6"} id={'core'}>
                    <ContextProvider cookies={cookies}>
                        {children}
                    </ContextProvider>
                </div>
            </div>
            <Footer/>
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}
