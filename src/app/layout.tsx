import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {cookies} from "next/headers";

import "./globals.css";

import {LanguageProvider, ThemeProvider} from "@/src/context";
import {getValidLanguage} from "@/src/helpers";
import {SiteShell} from "@/src/components/layout";
import {BRAND} from "@/src/constants/brand";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(BRAND.url),
    title: {
        default: "Stellaris — Explore the Universe Through NASA Data",
        template: "%s | Stellaris",
    },
    description:
        "Stellaris is a premium space exploration platform powered by NASA open data. Explore Mars, Earth, asteroids, space weather, missions, cosmic media, and the universe through an immersive digital experience.",
    keywords: [
        "Stellaris",
        "NASA API",
        "NASA open data",
        "space exploration",
        "astronomy",
        "Mars rover",
        "Earth imagery",
        "asteroids",
        "space weather",
        "exoplanets",
        "NASA media library",
    ],
    authors: [{name: BRAND.author}],
    creator: BRAND.author,
    openGraph: {
        title: "Stellaris — Explore the Universe Through NASA Data",
        description:
            "A cinematic space exploration platform powered by NASA open data.",
        url: BRAND.url,
        siteName: BRAND.name,
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
        <body className="min-h-full">
        <ThemeProvider>
            <LanguageProvider initialLang={initialLang}>
                <SiteShell>{children}</SiteShell>
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}