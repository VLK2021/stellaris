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

    const [activeId, setActiveId] = useState<MissionTimelineId>("apollo11");

    const activeMission =
        MISSION_TIMELINE.find((mission) => mission.id === activeId) ??
        MISSION_TIMELINE[0];

    return (
        <section className="relative isolate overflow-hidden bg-[#020611] px-4 py-12 text-white sm:px-6 lg:px-10">
            <div className="relative mx-auto max-w-[1680px] overflow-hidden rounded-[2.35rem] border border-white/10 p-4 sm:p-6 lg:p-7">
                <MissionTimelineBackground />

                <div className="relative z-10">
                    <motion.div
                        initial={{opacity: 0, y: 18}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <p className="text-[11px] font-black uppercase tracking-[0.32em] text-cyan-300">
                            {missionLocale.badge}
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-[-0.07em] sm:text-5xl">
                            {missionLocale.title}
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            {missionLocale.text}
                        </p>
                    </motion.div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
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

                    <MissionTimelineStats stats={missionLocale.stats} />
                </div>
            </div>
        </section>
    );
};