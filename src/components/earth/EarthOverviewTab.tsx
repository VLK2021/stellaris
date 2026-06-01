"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowUpRight, MapPin, RadioTower} from "lucide-react";

import type {EarthOverview} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    data: EarthOverview;
    t: EarthLocale;
};

export const EarthOverviewTab = ({data, t}: Props) => {
    const featuredImage = data.epicImages[0];

    return (
        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,var(--color-accent-soft),transparent_32%)]" />

                <h2 className="relative z-10 text-2xl font-black uppercase tracking-[-0.05em]">
                    {t.latestEvents}
                </h2>

                <div className="relative z-10 mt-5 grid gap-4">
                    {data.events.slice(0, 6).map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{opacity: 0, x: -18}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.35, delay: index * 0.04}}
                            className="group relative overflow-hidden rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                        >
                            <div className="absolute right-[-50px] top-[-50px] h-28 w-28 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />

                            <div className="relative z-10 flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                        {event.categories[0]?.title ?? t.category}
                                    </p>

                                    <h3 className="mt-2 text-lg font-black text-[var(--color-text)]">
                                        {event.title}
                                    </h3>

                                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                                        <span className="inline-flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {event.coordinates?.join(" / ") ?? "—"}
                                        </span>

                                        <span className="inline-flex items-center gap-1.5">
                                            <RadioTower className="h-3.5 w-3.5" />
                                            {event.geometryCount} track points
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href={`/earth/${encodeURIComponent(event.id)}`}
                                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] transition group-hover:rotate-45"
                                >
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(34,197,94,0.18),transparent_32%)]" />

                <h2 className="relative z-10 text-2xl font-black uppercase tracking-[-0.05em]">
                    {t.latestEarthImages}
                </h2>

                {featuredImage && (
                    <div className="relative z-10 mt-5 overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)]">
                        <img
                            src={featuredImage.imageUrl}
                            alt={featuredImage.caption}
                            className="aspect-square w-full object-cover"
                        />

                        <div className="p-4">
                            <p className="text-sm font-black text-[var(--color-text)]">
                                {featuredImage.date}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                                {featuredImage.caption}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};