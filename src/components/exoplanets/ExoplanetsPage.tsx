"use client";

import {ExoplanetsExplorer} from "./ExoplanetsExplorer";
import {ExoplanetsHero} from "./ExoplanetsHero";

const exoplanetTypography =
    "[&_h1]:bg-gradient-to-r [&_h1]:from-[var(--color-text)] [&_h1]:via-[var(--color-accent)] [&_h1]:to-[var(--color-brand-secondary)] [&_h1]:bg-clip-text [&_h1]:text-transparent " +
    "[&_h2]:bg-gradient-to-r [&_h2]:from-[var(--color-text)] [&_h2]:via-[var(--color-accent)] [&_h2]:to-[var(--color-brand-secondary)] [&_h2]:bg-clip-text [&_h2]:text-transparent " +
    "[&_.exo-label]:bg-gradient-to-r [&_.exo-label]:from-[var(--color-accent)] [&_.exo-label]:to-[var(--color-brand-secondary)] [&_.exo-label]:bg-clip-text [&_.exo-label]:text-transparent " +
    "[&_.exo-muted]:bg-gradient-to-r [&_.exo-muted]:from-[var(--color-text-muted)] [&_.exo-muted]:to-[var(--color-text-soft)] [&_.exo-muted]:bg-clip-text [&_.exo-muted]:text-transparent";

export const ExoplanetsPage = () => {
    return (
        <main className={`relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)] ${exoplanetTypography}`}>
            <div className="pointer-events-none fixed inset-0 opacity-80" style={{background: "var(--body-bg)"}} />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--color-accent-soft),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(139,92,246,.14),transparent_30%)]" />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <ExoplanetsHero />
                <ExoplanetsExplorer />
            </div>
        </main>
    );
};