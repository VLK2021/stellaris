"use client";

import Link from "next/link";
import {ArrowLeft} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

import {MarsBackground} from "@/src/components/mars/overview/MarsBackground";
import {MarsRoversGrid} from "./MarsRoversGrid";
import {MarsRoversHero} from "./MarsRoversHero";

type Props = {
    rovers: MarsRoverSummary[];
};

export const MarsRoversPage = ({rovers}: Props) => {
    const {locale} = useLanguage();
    const t = locale.mars as MarsLocale;

    return (
        <main
            className="relative min-h-screen overflow-hidden text-[var(--mars-text)]"
            style={{background: "var(--mars-bg)"}}
        >
            <MarsBackground />

            <div className="relative z-10 mx-auto grid max-w-[1580px] gap-6 px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    href="/mars"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t.roversBack}
                </Link>

                <MarsRoversHero rovers={rovers} t={t} />
                <MarsRoversGrid rovers={rovers} t={t} />
            </div>
        </main>
    );
};