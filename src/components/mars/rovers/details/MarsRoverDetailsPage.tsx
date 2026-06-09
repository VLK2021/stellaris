"use client";

import Link from "next/link";
import {ArrowLeft} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import type {
    MarsLocale,
    MarsRoverSummary,
} from "@/src/types/mars";

import {MarsBackground} from "@/src/components/mars/overview/MarsBackground";
import {MarsRoverCameraLinks} from "./MarsRoverCameraLinks";
import {MarsRoverDetailsHero} from "./MarsRoverDetailsHero";
import {MarsRoverDetailsTelemetry} from "./MarsRoverDetailsTelemetry";

type Props = {
    rover: MarsRoverSummary;
};

export const MarsRoverDetailsPage = ({rover}: Props) => {
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
                    href="/mars/rovers"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--mars-border)] bg-[var(--mars-surface)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t.roverDetailsBack}
                </Link>

                <MarsRoverDetailsHero rover={rover} t={t} />

                <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
                    <MarsRoverDetailsTelemetry rover={rover} t={t} />
                    <MarsRoverCameraLinks rover={rover} t={t} />
                </section>
            </div>
        </main>
    );
};