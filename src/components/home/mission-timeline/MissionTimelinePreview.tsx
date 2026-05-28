"use client";

import Link from "next/link";
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
            initial={{opacity: 0, scale: 0.975}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.45}}
            className="relative min-h-[480px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
        >
            <motion.img
                key={mission.image}
                src={mission.image}
                alt={copy.name}
                className="absolute inset-0 h-full w-full object-cover opacity-42"
                initial={{scale: 1.06}}
                animate={{scale: 1}}
                transition={{duration: 1.2}}
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,17,0.96),rgba(2,6,17,0.72),rgba(2,6,17,0.18))]" />

            <div className="relative z-10 max-w-xl">
                <p className="w-fit rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-cyan-300">
                    {copy.tag}
                </p>

                <h3 className="mt-6 text-4xl font-black tracking-[-0.07em] text-white sm:text-5xl">
                    {copy.name}
                </h3>

                <p className="mt-3 text-lg text-slate-200">{copy.short}</p>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                    {copy.description}
                </p>

                <div className="mt-6 grid max-w-md gap-3 border-t border-white/10 pt-5">
                    <Info icon={Calendar} label={locale.labels.launch} value={copy.launch} />
                    <Info icon={Rocket} label={locale.labels.type} value={copy.type} />
                    <Info icon={ShieldCheck} label={locale.labels.status} value={copy.status} />
                    <Info icon={Star} label={locale.labels.legacy} value={copy.legacy} />
                </div>

                <Link
                    href={mission.href}
                    className="mt-7 inline-flex items-center gap-3 rounded-full border border-cyan-300/25 bg-cyan-300/8 px-5 py-3 text-sm font-black text-cyan-300 transition hover:gap-4"
                >
                    {locale.explore}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </motion.article>
    );
};

const Info = ({icon: Icon, label, value}: {icon: typeof Calendar; label: string; value: string}) => (
    <div className="grid grid-cols-[22px_104px_1fr] items-center gap-3 text-sm">
        <Icon className="h-4 w-4 text-cyan-300" />
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-sm font-bold text-white">{value}</span>
    </div>
);