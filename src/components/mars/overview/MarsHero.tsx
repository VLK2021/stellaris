import {Activity, Camera, Radio, Rocket} from "lucide-react";

import type {MarsOverview} from "@/src/types/mars";

type Props = {
    data: MarsOverview;
};

export const MarsHero = ({data}: Props) => {
    return (
        <section className="relative min-h-[620px] overflow-hidden rounded-[2.6rem] border border-orange-300/15 bg-white/[0.035] p-6 shadow-[0_0_80px_rgba(249,115,22,.14)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(249,115,22,.24),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_45%)]" />
            <div className="absolute right-[8%] top-[10%] h-[420px] w-[420px] rounded-full border border-orange-300/20" />
            <div className="absolute right-[13%] top-[18%] h-[280px] w-[280px] rounded-full border border-orange-300/15" />

            <div className="relative z-10 grid min-h-[560px] items-center gap-8 lg:grid-cols-[1fr_440px]">
                <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.32em] text-orange-300">
                        Mars Mission Control
                    </p>

                    <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
                        Червона планета
                        <span className="block bg-gradient-to-r from-orange-200 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            під контролем
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60">
                        Центр дослідження Марса: ровери, камери, останні фото з поверхні,
                        місії, sol-дані та архів знімків.
                    </p>
                </div>

                <div className="grid gap-3">
                    <HeroSignal icon={Rocket} label="Rovers" value={data.stats.rovers} />
                    <HeroSignal icon={Activity} label="Active" value={data.stats.activeRovers} />
                    <HeroSignal icon={Camera} label="Photos loaded" value={data.stats.totalPhotos} />
                    <HeroSignal icon={Radio} label="Latest date" value={data.stats.latestEarthDate ?? "—"} />
                </div>
            </div>
        </section>
    );
};

const HeroSignal = ({
                        icon: Icon,
                        label,
                        value,
                    }: {
    icon: typeof Rocket;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-[1.4rem] border border-orange-200/15 bg-black/30 p-4 backdrop-blur-xl">
        <Icon className="h-5 w-5 text-orange-300" />
        <p className="mt-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/45">
            {label}
        </p>
        <p className="mt-1 text-2xl font-black text-white">{value}</p>
    </div>
);