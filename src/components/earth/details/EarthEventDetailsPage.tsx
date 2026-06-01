"use client";

import Link from "next/link";

import {useLanguage} from "@/src/context/LanguageContext";
import {useEarthEventDetails} from "@/src/hooks/earth/useEarthEventDetails";

import type {EarthLocale} from "@/src/types/earth/earthUi.types";

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

    if (loading) {
        return (
            <main className="min-h-screen bg-[var(--color-background)] p-6 text-[var(--color-text)]">
                <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-8">
                    {t.details.loading}
                </div>
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className="min-h-screen bg-[var(--color-background)] p-6 text-[var(--color-text)]">
                <div className="rounded-[2rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-8 text-[var(--color-error)]">
                    {error ?? t.details.notFound}
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[var(--color-background)] p-4 text-[var(--color-text)] sm:p-6 lg:p-8">
            <div className="mx-auto grid max-w-[1500px] gap-5">
                <Link
                    href="/earth"
                    className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-bold text-[var(--color-text-muted)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                    ← {t.details.back}
                </Link>

                <EarthEventDetailsHero event={data} t={t} />

                <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                    <EarthEventSources sources={data.sources} t={t} />
                    <EarthEventGeometryList geometry={data.geometry} t={t} />
                </section>

                <EarthEventRawData raw={data.raw} t={t} />
            </div>
        </main>
    );
};