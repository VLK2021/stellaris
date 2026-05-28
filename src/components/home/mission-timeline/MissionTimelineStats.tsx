import {Rocket, Satellite, UserRound, ImageIcon, Radio} from "lucide-react";
import type {MissionTimelineLocale} from "@/src/types/missionTimeline";

type Props = {
    stats: MissionTimelineLocale["stats"];
};

const icons = [Rocket, Satellite, UserRound, ImageIcon, Radio];

export const MissionTimelineStats = ({stats}: Props) => {
    return (
        <div className="mt-7 grid gap-3 rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl md:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat, index) => {
                const Icon = icons[index] ?? Rocket;

                return (
                    <div key={stat.label} className="flex items-center gap-4 border-white/10 xl:border-r xl:last:border-r-0">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-300/15 bg-cyan-300/8">
                            <Icon className="h-5 w-5 text-cyan-300" />
                        </div>

                        <div>
                            <p className="text-2xl font-black text-cyan-300">{stat.value}</p>
                            <p className="text-xs text-slate-400">{stat.label}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};