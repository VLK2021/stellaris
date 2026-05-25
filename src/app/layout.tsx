import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";

import "./globals.css";
import {LanguageProvider, ThemeProvider} from "@/src/context";
import {cookies} from "next/headers";
import {getValidLanguage} from "@/src/helpers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://stellaris.vercel.app"),
    title: {
        default: "Stellaris — Explore the Universe Through NASA Data",
        template: "%s | Stellaris",
    },
    description:
        "Stellaris is a premium space exploration platform powered by NASA open data. Explore Mars, Earth, asteroids, space weather, missions, and cosmic media in one immersive experience.",
    keywords: [
        "Stellaris",
        "NASA API",
        "space exploration",
        "Mars rover",
        "asteroids",
        "space weather",
        "Earth imagery",
        "exoplanets",
        "astronomy",
    ],
    authors: [{ name: "Volodymyr Kostiuk" }],
    creator: "Volodymyr Kostiuk",
    openGraph: {
        title: "Stellaris — Explore the Universe Through NASA Data",
        description:
            "A cinematic space exploration platform powered by NASA open data.",
        url: "https://stellaris.vercel.app",
        siteName: "Stellaris",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Stellaris — Explore the Universe Through NASA Data",
        description:
            "A cinematic space exploration platform powered by NASA open data.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const initialLang = getValidLanguage(cookieStore.get("lang")?.value);

    return (
        <html
            lang={initialLang}
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
        >
        <body className="min-h-full flex flex-col">
        <ThemeProvider>
            <LanguageProvider initialLang={initialLang}>
                {children}
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
