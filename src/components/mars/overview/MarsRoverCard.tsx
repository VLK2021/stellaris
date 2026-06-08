import {CalendarDays, Camera, CircleDot, Rocket} from "lucide-react";

import {getMarsStatusClass, getMarsStatusLabel, getRoverAccent} from "@/src/helpers/mars";
import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rover: MarsRoverSummary;
    index: number;
    t: MarsLocale;
};

export const MarsRoverCard = ({rover, index, t}: Props) => {
    return (
        <article className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/28 p-4 transition hover:border-orange-300/45 hover:shadow-[0_0_44px_rgba(249,115,22,.18)]">
            <div className={`absolute inset-0 bg-gradient-to-br ${getRoverAccent(index)}`} />

            <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                    <Rocket className="h-5 w-5 text-orange-300" />

                    <span className={`rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.16em] ${getMarsStatusClass(rover.status)}`}>
                        {getMarsStatusLabel(rover.status, t.active, t.complete)}
                    </span>
                </div>

                <h3 className="mt-5 text-2xl font-black uppercase tracking-[-0.06em] text-white">
                    {rover.label}
                </h3>

                <div className="mt-5 grid gap-2">
                    <Mini icon={CalendarDays} label={t.launch} value={rover.launchDate} />
                    <Mini icon={CalendarDays} label={t.landing} value={rover.landingDate} />
                    <Mini icon={CircleDot} label={t.maxSol} value={rover.maxSol} />
                    <Mini icon={Camera} label={t.cameras} value={rover.cameras.length} />
                </div>
            </div>
        </article>
    );
};

const Mini = ({icon: Icon, label, value}: {icon: typeof CalendarDays; label: string; value: string | number}) => (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
        <Icon className="h-4 w-4 text-orange-300" />
        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-white/40">{label}</p>
        <p className="mt-1 truncate text-xs font-black text-white">{value}</p>
    </div>
);