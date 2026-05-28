"use client";

import {motion} from "framer-motion";
import type {
    MissionTimelineId,
    MissionTimelineLocale,
    MissionTimelineMission,
} from "@/src/types/missionTimeline";

type Props = {
    missions: MissionTimelineMission[];
    locale: MissionTimelineLocale;
    activeId: MissionTimelineId;
    onSelect: (id: MissionTimelineId) => void;
};

export const MissionTimelineList = ({missions, locale, activeId, onSelect}: Props) => {
    return (
        <div className="relative">
            <div className="absolute left-[72px] top-8 bottom-8 hidden w-px bg-gradient-to-b from-cyan-300/60 via-blue-400/30 to-violet-400/60 sm:block" />

            <div className="grid gap-4">
                {missions.map((mission, index) => {
                    const copy = locale.missions[mission.id];
                    const active = mission.id === activeId;

                    return (
                        <motion.button
                            key={mission.id}
                            type="button"
                            onClick={() => onSelect(mission.id)}
                            initial={{opacity: 0, x: -22}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.45, delay: index * 0.06}}
                            className={`group relative grid grid-cols-[72px_1fr] items-center gap-4 rounded-[1.4rem] border p-4 text-left transition ${
                                active
                                    ? "border-cyan-300/50 bg-cyan-300/8 shadow-[0_0_45px_rgba(34,211,238,0.16)]"
                                    : "border-white/8 bg-white/[0.025] hover:border-cyan-300/25"
                            }`}
                        >
                            <span className="text-lg font-black text-cyan-300">{mission.year}</span>

                            <span className="flex items-center gap-4">
                                <span className="relative h-16 w-16 overflow-hidden rounded-full border border-cyan-300/20">
                                    <img src={mission.image} alt={copy.name} className="h-full w-full object-cover" />
                                </span>

                                <span>
                                    <span className="block text-xl font-black text-white">{copy.name}</span>
                                    <span className="mt-1 block text-sm text-slate-400">{copy.short}</span>
                                </span>
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};