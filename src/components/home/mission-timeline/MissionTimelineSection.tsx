"use client";

import {useState} from "react";
import {motion} from "framer-motion";

import {useLanguage} from "@/src/context/LanguageContext";

import type {MissionTimelineId} from "@/src/types/missionTimeline";

import {MISSION_TIMELINE} from "@/src/constants/missionTimeline.constants";

import {MissionTimelineBackground} from "./MissionTimelineBackground";
import {MissionTimelineList} from "./MissionTimelineList";
import {MissionTimelinePreview} from "./MissionTimelinePreview";
import {MissionTimelineStats} from "./MissionTimelineStats";

export const MissionTimelineSection = () => {
    const {locale} = useLanguage();

    const missionLocale = locale.missionTimeline;

    const [activeId, setActiveId] =
        useState<MissionTimelineId>("apollo11");

    const activeMission =
        MISSION_TIMELINE.find(
            (mission) => mission.id === activeId,
        ) ?? MISSION_TIMELINE[0];

    return (
        <section className="relative isolate overflow-hidden bg-[#020611] px-4 py-14 text-white sm:px-6 lg:px-10">
            <div className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[2.6rem] border border-white/10 p-5 sm:p-8">
                <MissionTimelineBackground />

                <div className="relative z-10">
                    <motion.div
                        initial={{opacity: 0, y: 22}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.65}}
                        className="mx-auto max-w-4xl text-center"
                    >
                        <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-300">
                            {missionLocale.badge}
                        </p>

                        <h2 className="mt-4 text-4xl font-black tracking-[-0.075em] sm:text-6xl">
                            {missionLocale.title}
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-300">
                            {missionLocale.text}
                        </p>
                    </motion.div>

                    <div className="mt-10 grid gap-7 lg:grid-cols-[0.82fr_1.18fr]">
                        <MissionTimelineList
                            missions={MISSION_TIMELINE}
                            locale={missionLocale}
                            activeId={activeId}
                            onSelect={setActiveId}
                        />

                        <MissionTimelinePreview
                            mission={activeMission}
                            locale={missionLocale}
                        />
                    </div>

                    <MissionTimelineStats
                        stats={missionLocale.stats}
                    />
                </div>
            </div>
        </section>
    );
};