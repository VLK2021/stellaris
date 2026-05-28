"use client";

import {motion} from "framer-motion";
import {ArrowRight, Calendar, Rocket, ShieldCheck, Star} from "lucide-react";
import type {MissionTimelineLocale, MissionTimelineMission} from "@/src/types/missionTimeline";

type Props = {
    mission: MissionTimelineMission;
    locale: MissionTimelineLocale;
};

export const MissionTimelinePreview = ({mission, locale}: Props) => {
    const copy = locale.missions[mission.id];

    return (
        <motion.article
            key={mission.id}
            initial={{opacity: 0, scale: 0.97}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.45}}
            className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl"
        >
            <img src={mission.image} alt={copy.name} className="absolute inset-0 h-full w-full object-cover opacity-42" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.96),rgba(2,6,17,0.74),rgba(2,6,17,0.18))]" />

            <div className="relative z-10 max-w-xl">
                <p className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                    {copy.tag}
                </p>

                <h3 className="mt-7 text-5xl font-black tracking-[-0.075em] text-white">
                    {copy.name}
                </h3>

                <p className="mt-3 text-xl text-slate-200">{copy.short}</p>
                <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">{copy.description}</p>

                <div className="mt-7 grid max-w-md gap-4 border-t border-white/10 pt-6">
                    <Info icon={Calendar} label="Launch" value={copy.launch} />
                    <Info icon={Rocket} label="Mission Type" value={copy.type} />
                    <Info icon={ShieldCheck} label="Status" value={copy.status} />
                    <Info icon={Star} label="Legacy" value={copy.legacy} />
                </div>

                <button className="mt-8 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-6 py-3 text-sm font-black text-cyan-300">
                    {locale.explore}
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </motion.article>
    );
};

const Info = ({icon: Icon, label, value}: {icon: typeof Calendar; label: string; value: string}) => (
    <div className="grid grid-cols-[24px_120px_1fr] items-center gap-3 text-sm">
        <Icon className="h-4 w-4 text-cyan-300" />
        <span className="text-slate-400">{label}</span>
        <span className="font-bold text-white">{value}</span>
    </div>
);