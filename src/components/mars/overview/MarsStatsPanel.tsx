import {Camera, CircleDot, Radio, Satellite} from "lucide-react";

import type {MarsOverview} from "@/src/types/mars";

type Props = {
    data: MarsOverview;
};

export const MarsStatsPanel = ({data}: Props) => {
    return (
        <section className="grid gap-4 md:grid-cols-4">
            <Stat icon={Satellite} label="Роверів" value={data.stats.rovers} />
            <Stat icon={CircleDot} label="Активні" value={data.stats.activeRovers} />
            <Stat icon={Camera} label="Фото у стрічці" value={data.stats.totalPhotos} />
            <Stat icon={Radio} label="Останній сигнал" value={data.stats.latestEarthDate ?? "—"} />
        </section>
    );
};

const Stat = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof Satellite;
    label: string;
    value: string | number;
}) => (
    <article className="relative overflow-hidden rounded-[1.6rem] border border-orange-200/12 bg-white/[0.035] p-5">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,115,22,.16),transparent_62%)]" />
        <div className="relative z-10">
            <Icon className="h-5 w-5 text-orange-300" />
            <p className="mt-4 text-[9px] font-black uppercase tracking-[0.22em] text-white/45">
                {label}
            </p>
            <p className="mt-1 truncate text-2xl font-black text-white">{value}</p>
        </div>
    </article>
);