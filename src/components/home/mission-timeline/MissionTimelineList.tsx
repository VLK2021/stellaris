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
            <motion.div
                className="absolute bottom-8 left-[64px] top-8 hidden w-px bg-gradient-to-b from-cyan-300/60 via-blue-400/30 to-violet-400/60 sm:block"
                animate={{opacity: [0.35, 1, 0.35]}}
                transition={{duration: 3, repeat: Infinity}}
            />

            <div className="grid gap-3">
                {missions.map((mission, index) => {
                    const copy = locale.missions[mission.id];
                    const active = mission.id === activeId;

                    return (
                        <motion.button
                            key={mission.id}
                            type="button"
                            onClick={() => onSelect(mission.id)}
                            initial={{opacity: 0, x: -18}}
                            whileInView={{opacity: 1, x: 0}}
                            whileHover={{x: 5}}
                            viewport={{once: true}}
                            transition={{duration: 0.42, delay: index * 0.05}}
                            className={`group relative grid grid-cols-[62px_1fr] items-center gap-3 rounded-[1.25rem] border p-3 text-left transition ${
                                active
                                    ? "border-cyan-300/45 bg-cyan-300/8 shadow-[0_0_38px_rgba(34,211,238,0.14)]"
                                    : "border-white/8 bg-white/[0.025] hover:border-cyan-300/25"
                            }`}
                        >
                            <span className="text-base font-black text-cyan-300">
                                {mission.year}
                            </span>

                            <span className="flex items-center gap-3">
                                <span className="relative h-14 w-14 overflow-hidden rounded-full border border-cyan-300/20">
                                    <img src={mission.image} alt={copy.name} className="h-full w-full object-cover" />
                                </span>

                                <span>
                                    <span className="block text-lg font-black text-white">{copy.name}</span>
                                    <span className="mt-1 block text-xs text-slate-400">{copy.short}</span>
                                </span>
                            </span>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};