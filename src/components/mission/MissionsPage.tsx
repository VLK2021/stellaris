"use client";

import type {MissionCatalogItem} from "@/src/constants/missions";

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
            <div className="pointer-events-none fixed inset-0 opacity-80">
                <div className="absolute inset-0" style={{background: "var(--hero-bg)"}} />
                <div className="absolute left-[-12rem] top-[10rem] h-[32rem] w-[32rem] rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
                <div className="absolute right-[-14rem] top-[8rem] h-[36rem] w-[36rem] rounded-full bg-[var(--color-brand-secondary)]/10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
                <MissionExplorer missions={missions} stats={stats} />
            </div>
        </main>
    );
};