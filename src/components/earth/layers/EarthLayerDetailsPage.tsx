"use client";

import Link from "next/link";
import {ArrowLeft} from "lucide-react";

import {useLanguage} from "@/src/context/LanguageContext";
import {useEarthLayerDetails} from "@/src/hooks/earth/useEarthLayerDetails";

import type {EarthLocale} from "@/src/types/earth/earthUi.types";

import {EarthBackground} from "../EarthBackground";
import {EarthLayerDetailsHero} from "./EarthLayerDetailsHero";
import {EarthLayerPreview} from "./EarthLayerPreview";
import {EarthLayerTemplateBlock} from "@/src/components/earth/layers/EarthLayerTemplateBlock";

type Props = {
    layerId: string;
};

const earthTypography =
    "[&_h1]:bg-gradient-to-r [&_h1]:from-[var(--color-text)] [&_h1]:via-[var(--color-accent)] [&_h1]:to-[var(--color-brand-secondary)] [&_h1]:bg-clip-text [&_h1]:text-transparent " +
    "[&_h2]:bg-gradient-to-r [&_h2]:from-[var(--color-text)] [&_h2]:via-[var(--color-accent)] [&_h2]:to-[var(--color-brand-secondary)] [&_h2]:bg-clip-text [&_h2]:text-transparent " +
    "[&_h3]:bg-gradient-to-r [&_h3]:from-[var(--color-text)] [&_h3]:via-[var(--color-accent)] [&_h3]:to-[var(--color-earth)] [&_h3]:bg-clip-text [&_h3]:text-transparent " +
    "[&_.earth-label]:bg-gradient-to-r [&_.earth-label]:from-[var(--color-accent)] [&_.earth-label]:to-[var(--color-brand-secondary)] [&_.earth-label]:bg-clip-text [&_.earth-label]:text-transparent " +
    "[&_.earth-muted]:bg-gradient-to-r [&_.earth-muted]:from-[var(--color-text-muted)] [&_.earth-muted]:to-[var(--color-text-soft)] [&_.earth-muted]:bg-clip-text [&_.earth-muted]:text-transparent";

export const EarthLayerDetailsPage = ({layerId}: Props) => {
    const {locale} = useLanguage();
    const t = locale.earth as EarthLocale;

    const {data, loading, error} = useEarthLayerDetails(layerId);

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
                        {error ?? "NASA GIBS layer not found."}
                    </section>
                )}

                {!loading && data && (
                    <>
                        <EarthLayerDetailsHero layer={data} />

                        <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                            <EarthLayerPreview layer={data} />

                            <section className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
                                <div className="absolute inset-0 opacity-30" style={{background: "var(--hero-bg)"}} />

                                <div className="relative z-10">
                                    <h2 className="text-xl font-black uppercase tracking-[-0.04em]">
                                        Layer Dimensions
                                    </h2>

                                    <div className="mt-4 grid gap-3">
                                        {data.dimensions.length > 0 ? (
                                            data.dimensions.map((dimension) => (
                                                <div
                                                    key={dimension.id}
                                                    className="rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl"
                                                >
                                                    <p className="earth-label text-xs font-black uppercase tracking-[0.18em]">
                                                        {dimension.id}
                                                    </p>

                                                    <p className="mt-2 text-sm font-bold text-[var(--color-text)]">
                                                        Default: {dimension.defaultValue ?? "—"}
                                                    </p>

                                                    <p className="earth-muted mt-2 text-xs leading-5">
                                                        Values: {dimension.values.length}
                                                    </p>

                                                    {dimension.values.length > 0 && (
                                                        <div className="mt-3 max-h-[120px] overflow-y-auto rounded-[0.9rem] border border-[var(--color-border)] bg-[var(--color-card)]/50 p-3 text-xs text-[var(--color-text-muted)]">
                                                            {dimension.values.map((value) => (
                                                                <p key={value}>{value}</p>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <p className="earth-muted text-sm">
                                                NASA GIBS did not return dimensions for this layer.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </section>

                        <EarthLayerTemplateBlock template={data.resourceTemplate} />
                    </>
                )}
            </div>
        </main>
    );
};