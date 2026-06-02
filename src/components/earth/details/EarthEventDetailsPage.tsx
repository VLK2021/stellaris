"use client";

import Link from "next/link";
import {ArrowLeft} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useEarthEventDetails} from "@/src/hooks/earth/useEarthEventDetails";

import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthBackground} from "../EarthBackground";
import {EarthEventDetailsHero} from "./EarthEventDetailsHero";
import {EarthEventGeometryList} from "./EarthEventGeometryList";
import {EarthEventOfficialInfo} from "./EarthEventOfficialInfo";
import {EarthEventRawData} from "./EarthEventRawData";
import {EarthEventSources} from "./EarthEventSources";

type Props = {
    eventId: string;
};

const earthTypography =
    "[&_h1]:bg-gradient-to-r [&_h1]:from-[var(--color-text)] [&_h1]:via-[var(--color-accent)] [&_h1]:to-[var(--color-brand-secondary)] [&_h1]:bg-clip-text [&_h1]:text-transparent " +
    "[&_h2]:bg-gradient-to-r [&_h2]:from-[var(--color-text)] [&_h2]:via-[var(--color-accent)] [&_h2]:to-[var(--color-brand-secondary)] [&_h2]:bg-clip-text [&_h2]:text-transparent " +
    "[&_h3]:bg-gradient-to-r [&_h3]:from-[var(--color-text)] [&_h3]:via-[var(--color-accent)] [&_h3]:to-[var(--color-earth)] [&_h3]:bg-clip-text [&_h3]:text-transparent " +
    "[&_.earth-label]:bg-gradient-to-r [&_.earth-label]:from-[var(--color-accent)] [&_.earth-label]:to-[var(--color-brand-secondary)] [&_.earth-label]:bg-clip-text [&_.earth-label]:text-transparent " +
    "[&_.earth-muted]:bg-gradient-to-r [&_.earth-muted]:from-[var(--color-text-muted)] [&_.earth-muted]:to-[var(--color-text-soft)] [&_.earth-muted]:bg-clip-text [&_.earth-muted]:text-transparent";

export const EarthEventDetailsPage = ({eventId}: Props) => {
    const {locale} = useLanguage();
    const t = locale.earth as EarthLocale;

    const {data, loading, error} = useEarthEventDetails(eventId);

    return (
        <main className={`relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)] ${earthTypography}`}>
            <EarthBackground />

            <div className="relative z-10 mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:px-8">
                <Link
                    href="/earth"
                    className="earth-label inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                >
                    <ArrowLeft className="h-4 w-4 text-[var(--color-accent)]" />
                    {t.details.back}
                </Link>

                {loading && (
                    <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-[var(--shadow-card)] backdrop-blur-2xl">
                        <div className="absolute inset-0 opacity-40" style={{background: "var(--hero-bg)"}} />
                        <p className="relative z-10 text-sm font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {t.details.loading}
                        </p>
                    </section>
                )}

                {!loading && (error || !data) && (
                    <section className="rounded-[2rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-8 text-[var(--color-error)]">
                        {error ?? t.details.notFound}
                    </section>
                )}

                {!loading && data && (
                    <>
                        <EarthEventDetailsHero enrichment={data} t={t} />

                        <EarthEventOfficialInfo enrichment={data} t={t} />

                        <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
                            <EarthEventSources sources={data.event.sources} officialSources={data.officialSources} t={t} />
                            <EarthEventGeometryList geometry={data.event.geometry} t={t} />
                        </section>

                        <EarthEventRawData raw={data.event.raw} t={t} />
                    </>
                )}
            </div>
        </main>
    );
};