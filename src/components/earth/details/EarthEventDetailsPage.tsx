"use client";

import Link from "next/link";
import {ArrowLeft} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useEarthEventDetails} from "@/src/hooks/earth/useEarthEventDetails";

import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthBackground} from "../EarthBackground";
import {EarthEventDetailsHero} from "./EarthEventDetailsHero";
import {EarthEventGeometryList} from "./EarthEventGeometryList";
import {EarthEventRawData} from "./EarthEventRawData";
import {EarthEventSources} from "./EarthEventSources";

type Props = {
    eventId: string;
};

export const EarthEventDetailsPage = ({eventId}: Props) => {
    const {locale} = useLanguage();
    const t = locale.earth as EarthLocale;

    const {data, loading, error} = useEarthEventDetails(eventId);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
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
                        <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />
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
                        <EarthEventDetailsHero event={data} t={t} />

                        <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
                            <EarthEventSources sources={data.sources} t={t} />
                            <EarthEventGeometryList geometry={data.geometry} t={t} />
                        </section>

                        <EarthEventRawData raw={data.raw} t={t} />
                    </>
                )}
            </div>
        </main>
    );
};