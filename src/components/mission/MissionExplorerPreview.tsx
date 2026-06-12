"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {
    ArrowRight,
    Braces,
    Database,
    FileJson,
    Globe2,
    Radio,
    Rocket,
    Sparkles,
} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionCatalogItem} from "@/src/constants/missions";

import {MissionGradientTitle} from "./MissionGradientTitle";
import {MissionPipeline} from "./MissionPipeline";
import {MissionPreviewInfoCard} from "./MissionPreviewInfoCard";

type Props = {
    mission: MissionCatalogItem;
};

const getTargetLocaleKey = (value: string) => {
    if (value === "deep-space") return "deepSpace";
    if (value === "earth-orbit") return "earthOrbit";

    return value;
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

    const pipelineSteps = [
        t.pipelineSteps.catalog,
        t.pipelineSteps.wikipedia,
        t.pipelineSteps.wikidata,
        t.pipelineSteps.nasaMedia,
        t.pipelineSteps.normalizer,
    ];

    return (
        <section className="relative overflow-hidden p-5 md:p-7">
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    animate={{
                        opacity: [0.45, 0.85, 0.45],
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,var(--color-accent-soft),transparent_28%),radial-gradient(circle_at_14%_88%,var(--color-glass),transparent_34%),radial-gradient(circle_at_55%_55%,var(--color-card-deep),transparent_30%)] bg-[length:140%_140%]"
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

                    <MissionGradientTitle className="mt-6 max-w-4xl text-4xl leading-[0.94] md:text-5xl xl:text-6xl">
                        {mission.name}
                    </MissionGradientTitle>

                    <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] md:text-base">
                        {t.previewText}
                    </p>

                    <div className="mt-7 grid gap-3 md:grid-cols-3">
                        <MissionPreviewInfoCard
                            icon={Database}
                            label={t.category}
                            value={categoryLabel}
                        />

                        <MissionPreviewInfoCard
                            icon={Globe2}
                            label={t.target}
                            value={targetLabel}
                        />

                        <MissionPreviewInfoCard
                            icon={Rocket}
                            label={t.nasaQuery}
                            value={mission.nasaMediaQuery}
                        />
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                        <MissionPreviewInfoCard
                            icon={Braces}
                            label={t.wikipediaTitle}
                            value={mission.wikipediaTitle}
                        />

                        <MissionPreviewInfoCard
                            icon={FileJson}
                            label={t.wikidataSearch}
                            value={mission.wikidataSearch}
                        />
                    </div>

                    <div className="mt-6">
                        <MissionPipeline
                            title={t.pipeline}
                            steps={pipelineSteps}
                        />
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