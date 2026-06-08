import {Activity, Camera, Radio, Rocket, Satellite} from "lucide-react";

import type {MarsLocale, MarsOverview} from "@/src/types/mars";

type Props = {
    data: MarsOverview;
    t: MarsLocale;
};

export const MarsHero = ({data, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[3rem] border border-orange-200/15 bg-white/[0.035] p-6 shadow-[0_0_90px_rgba(249,115,22,.18)] sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(249,115,22,.24),transparent_30%),radial-gradient(circle_at_18%_16%,rgba(56,189,248,.10),transparent_30%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_46%)]" />
            <div className="absolute right-[8%] top-[12%] hidden h-[420px] w-[420px] rounded-full border border-orange-300/20 xl:block" />
            <div className="absolute right-[14%] top-[22%] hidden h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#fed7aa,#f97316_34%,#7c2d12_72%)] shadow-[0_0_80px_rgba(249,115,22,.28)] xl:block" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-orange-300/35 to-transparent" />

            <div className="relative z-10 grid min-h-[620px] items-center gap-8 xl:grid-cols-[1fr_430px]">
                <div>
                    <div className="inline-flex items-center gap-3 rounded-full border border-orange-200/15 bg-black/30 px-4 py-2 backdrop-blur-xl">
                        <span className="h-2 w-2 rounded-full bg-orange-300 shadow-[0_0_18px_rgba(251,146,60,.9)]" />
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-200">
                            {t.heroEyebrow}
                        </p>
                    </div>

                    <h1 className="mt-6 max-w-5xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
                        {t.heroTitle}
                        <span className="block bg-gradient-to-r from-orange-100 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            {t.heroAccent}
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                        {t.heroDescription}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <MissionPill icon={Rocket} label={t.roverNetwork} />
                        <MissionPill icon={Camera} label={t.surfaceImages} />
                        <MissionPill icon={Satellite} label={t.nasaStream} />
                    </div>
                </div>

                <aside className="relative overflow-hidden rounded-[2rem] border border-orange-200/15 bg-black/35 p-5 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,146,60,.18),rgba(56,189,248,.06),transparent_70%)]" />

                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">
                            {t.telemetry}
                        </p>

                        <div className="mt-5 grid gap-3">
                            <HeroSignal icon={Rocket} label={t.rovers} value={data.stats.rovers} />
                            <HeroSignal icon={Activity} label={t.activeMissions} value={data.stats.activeRovers} />
                            <HeroSignal icon={Camera} label={t.loadedPhotos} value={data.stats.totalPhotos} />
                            <HeroSignal icon={Radio} label={t.latestTransmission} value={data.stats.latestEarthDate ?? "—"} />
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
};

const MissionPill = ({icon: Icon, label}: {icon: typeof Rocket; label: string}) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/15 bg-black/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/60 backdrop-blur-xl">
        <Icon className="h-4 w-4 text-orange-300" />
        {label}
    </span>
);

const HeroSignal = ({icon: Icon, label, value}: {icon: typeof Rocket; label: string; value: string | number}) => (
    <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.035] p-4 transition hover:border-orange-300/40 hover:bg-orange-300/[0.06]">
        <Icon className="h-4 w-4 text-orange-300" />
        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.2em] text-white/40">{label}</p>
        <p className="mt-1 truncate text-xl font-black text-white">{value}</p>
    </div>
);