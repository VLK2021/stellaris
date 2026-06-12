"use client";

import type {MissionCatalogItem} from "@/src/constants/missions";

import {MissionControlHero} from "./MissionControlHero";
import {MissionExplorer} from "./MissionExplorer";

type Props = {
    missions: MissionCatalogItem[];
    stats: {
        total: number;
        crewed: number;
        robotic: number;
        telescope: number;
        station: number;
    };
};

export const MissionsPage = ({missions, stats}: Props) => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0">
                <div
                    className="absolute inset-0 opacity-95"
                    style={{background: "var(--hero-bg)"}}
                />
                <div className="absolute left-[-16rem] top-[7rem] h-[36rem] w-[36rem] rounded-full bg-[var(--color-accent)]/12 blur-3xl" />
                <div className="absolute right-[-18rem] top-[9rem] h-[40rem] w-[40rem] rounded-full bg-[var(--color-brand-secondary)]/14 blur-3xl" />
                <div className="absolute bottom-[-20rem] left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[var(--color-plasma)]/10 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,.07)_1px,transparent_1px)] bg-[size:56px_56px] opacity-50" />
            </div>

            <div className="relative z-10 mx-auto flex max-w-[1540px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                <MissionControlHero stats={stats} />
                <MissionExplorer missions={missions} stats={stats} />
            </div>
        </main>
    );
};