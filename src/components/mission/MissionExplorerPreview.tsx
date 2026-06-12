"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {
    ArrowRight,
    Braces,
    Database,
    FileJson,
    Globe2,
    Layers3,
    Radio,
    Rocket,
    Sparkles,
} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionCatalogItem} from "@/src/constants/missions";

type Props = {
    mission: MissionCatalogItem;
};

const PIPELINE = [
    "Catalog",
    "Wikipedia",
    "Wikidata",
    "NASA Media",
    "Normalizer",
];

const getTargetLocaleKey = (target: string) => {
    if (target === "deep-space") return "deepSpace";
    if (target === "earth-orbit") return "earthOrbit";

    return target;
};

export const MissionExplorerPreview = ({mission}: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions;

    const targetKey = getTargetLocaleKey(mission.target);

    const categoryLabel =
        t.categoryLabels[mission.category as keyof typeof t.categoryLabels] ??
        mission.category;

    const targetLabel =
        t.targetLabels[targetKey as keyof typeof t.targetLabels] ??
        mission.target;

    return (
        <section className="relative overflow-hidden p-5 md:p-7">
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{opacity: [0.45, 0.85, 0.45]}}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,var(--color-accent-soft),transparent_28%),radial-gradient(circle_at_14%_88%,var(--color-glass),transparent_34%),radial-gradient(circle_at_55%_55%,var(--color-card),transparent_30%)]"
                />

                <motion.div
                    animate={{rotate: 360}}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute right-[-5rem] top-[-5rem] h-80 w-80 rounded-full border border-dashed border-[var(--color-border)]"
                />

                <motion.div
                    animate={{rotate: -360}}
                    transition={{
                        duration: 48,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute right-[4rem] top-[5rem] h-48 w-48 rounded-full border border-dashed border-[var(--color-border-strong)]"
                />

                <div className="absolute bottom-[-8rem] left-[14%] h-64 w-64 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />
            </div>

            <motion.div
                key={mission.slug}
                initial={{opacity: 0, y: 18}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.35}}
                className="relative z-10 grid h-full content-between gap-8"
            >
                <div>
                    <div className="flex flex-wrap items-center gap-3">
                        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)] backdrop-blur-xl">
                            <Sparkles className="h-4 w-4" />
                            {t.selectedMission}
                        </p>

                        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-text-muted)] backdrop-blur-xl">
                            <Radio className="h-4 w-4 text-[var(--color-success)]" />
                            {t.liveSources}
                        </p>
                    </div>

                    <h2 className="mt-6 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.94] tracking-[-0.07em] text-transparent md:text-5xl xl:text-6xl">
                        {mission.name}
                    </h2>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
                        {t.previewText}
                    </p>

                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <Info
                            icon={Database}
                            label={t.category}
                            value={categoryLabel}
                        />

                        <Info
                            icon={Globe2}
                            label={t.target}
                            value={targetLabel}
                        />

                        <Info
                            icon={Rocket}
                            label={t.nasaQuery}
                            value={mission.nasaMediaQuery}
                        />
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                        <SourceCard
                            icon={Braces}
                            label={t.wikipediaTitle}
                            value={mission.wikipediaTitle}
                        />

                        <SourceCard
                            icon={FileJson}
                            label={t.wikidataSearch}
                            value={mission.wikidataSearch}
                        />
                    </div>

                    <div className="mt-6 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
                        <div className="mb-4 flex items-center gap-2">
                            <Layers3 className="h-5 w-5 text-[var(--color-accent)]" />

                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                                {t.pipeline}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {PIPELINE.map((item, index) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2"
                                >
                                    <motion.span
                                        whileHover={{y: -3}}
                                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-text)]"
                                    >
                                        {item}
                                    </motion.span>

                                    {index < PIPELINE.length - 1 && (
                                        <ArrowRight className="h-3.5 w-3.5 text-[var(--color-text-soft)]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href={`/missions/${mission.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-card-solid)] shadow-[var(--shadow-glow)] transition hover:scale-[1.02]"
                    >
                        {t.details}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

const Info = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Rocket;
    label: string;
    value: string;
}) => (
    <motion.div
        whileHover={{y: -4}}
        className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
    >
        <Icon className="h-5 w-5 text-[var(--color-accent)]" />

        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
            {label}
        </p>

        <p className="mt-1 line-clamp-2 text-sm font-black text-[var(--color-text)]">
            {value}
        </p>
    </motion.div>
);

const SourceCard = ({
                        icon: Icon,
                        label,
                        value,
                    }: {
    icon: typeof Braces;
    label: string;
    value: string;
}) => (
    <motion.div
        whileHover={{y: -4}}
        className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl transition hover:border-[var(--color-accent)]"
    >
        <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)]">
                <Icon className="h-4 w-4 text-[var(--color-accent)]" />
            </div>

            <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                    {label}
                </p>

                <p className="mt-1 truncate text-sm font-black text-[var(--color-text)]">
                    {value}
                </p>
            </div>
        </div>
    </motion.div>
);