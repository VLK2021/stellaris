"use client";

import Link from "next/link";
import {ArrowLeft} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useSpaceWeatherEventDetails} from "@/src/hooks/space-weather/useSpaceWeatherEventDetails";
import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

import {SpaceWeatherBackground} from "../SpaceWeatherBackground";
import {SpaceWeatherEventDetailsHero} from "./SpaceWeatherEventDetailsHero";
import {SpaceWeatherEventDetailsLoading} from "./SpaceWeatherEventDetailsLoading";
import {SpaceWeatherEventDetailsPanels} from "./SpaceWeatherEventDetailsPanels";

type Props = {
    eventId: string;
    type?: SpaceWeatherEvent["type"];
    startDate?: string;
    endDate?: string;
};

export const SpaceWeatherEventDetailsPageClient = ({
                                                       eventId,
                                                       type,
                                                       startDate,
                                                       endDate,
                                                   }: Props) => {
    const {locale} = useLanguage();
    const t = locale.spaceWeather as SpaceWeatherLocale;

    const {data, loading, error} = useSpaceWeatherEventDetails({
        eventId,
        type,
        startDate,
        endDate,
    });

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] px-3 py-6 text-[var(--color-text)] sm:px-5 sm:py-8 lg:px-8">
            <SpaceWeatherBackground />

            <div className="relative z-10 mx-auto max-w-[1540px]">
                <Link
                    href="/space-weather"
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-xs font-black text-[var(--color-text-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent)]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t.backToSpaceWeather}
                </Link>

                {loading && <SpaceWeatherEventDetailsLoading />}

                {!loading && error && (
                    <div className="rounded-[1.5rem] border border-[var(--color-error)]/30 bg-[var(--color-error)]/10 p-5 text-sm text-[var(--color-error)]">
                        {error}
                    </div>
                )}

                {!loading && data && (
                    <div className="grid gap-5">
                        <SpaceWeatherEventDetailsHero
                            locale={t}
                            details={data}
                        />

                        <SpaceWeatherEventDetailsPanels
                            locale={t}
                            details={data}
                        />
                    </div>
                )}
            </div>
        </main>
    );
};