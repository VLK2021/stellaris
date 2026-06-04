"use client";

import {useLanguage} from "@/src/context/LanguageContext";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetsCommandCenter} from "./ExoplanetsCommandCenter";
import {ExoplanetsHero} from "./ExoplanetsHero";
import {ExoplanetsSpaceBackground} from "./ExoplanetsSpaceBackground";

const exoplanetTypography =
    "[&_h1]:bg-gradient-to-r [&_h1]:from-[var(--color-text)] [&_h1]:via-[var(--color-accent)] [&_h1]:to-[var(--color-brand-secondary)] [&_h1]:bg-clip-text [&_h1]:text-transparent " +
    "[&_h2]:bg-gradient-to-r [&_h2]:from-[var(--color-text)] [&_h2]:via-[var(--color-accent)] [&_h2]:to-[var(--color-brand-secondary)] [&_h2]:bg-clip-text [&_h2]:text-transparent " +
    "[&_h3]:bg-gradient-to-r [&_h3]:from-[var(--color-text)] [&_h3]:via-[var(--color-accent)] [&_h3]:to-[var(--color-earth)] [&_h3]:bg-clip-text [&_h3]:text-transparent " +
    "[&_.exo-label]:bg-gradient-to-r [&_.exo-label]:from-[var(--color-accent)] [&_.exo-label]:to-[var(--color-brand-secondary)] [&_.exo-label]:bg-clip-text [&_.exo-label]:text-transparent " +
    "[&_.exo-muted]:bg-gradient-to-r [&_.exo-muted]:from-[var(--color-text-muted)] [&_.exo-muted]:to-[var(--color-text-soft)] [&_.exo-muted]:bg-clip-text [&_.exo-muted]:text-transparent";

export const ExoplanetsPage = () => {
    const {locale} = useLanguage();
    const t = locale.exoplanets as ExoplanetsLocale;

    return (
        <main className={`relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)] ${exoplanetTypography}`}>
            <ExoplanetsSpaceBackground />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <ExoplanetsHero t={t} />
                <ExoplanetsCommandCenter t={t} />
            </div>
        </main>
    );
};