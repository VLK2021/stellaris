"use client";

import Link from "next/link";
import {motion} from "framer-motion";

import {useLanguage} from "@/src/context";

type VisualType =
    | "apod"
    | "earth"
    | "mars"
    | "asteroid"
    | "sun"
    | "exoplanet"
    | "camera"
    | "satellite"
    | "database"
    | "book"
    | "rocket"
    | "calendar"
    | "more";

type ModuleItem = {
    label: string;
    href: string;
    visual: VisualType;
};

const ModuleVisual = ({type}: {type: VisualType}) => {
    if (type === "earth") {
        return (
            <div className="relative h-14 w-14 rounded-full bg-[radial-gradient(circle_at_30%_25%,#eff6ff,#2563eb_34%,#0f766e_52%,#020617_86%)] shadow-[0_0_28px_rgba(59,130,246,0.55)]">
                <div className="absolute left-4 top-3 h-4 w-5 rounded-full bg-emerald-300/70 blur-[1px]" />
                <div className="absolute bottom-3 right-3 h-5 w-3 rounded-full bg-emerald-400/60 blur-[1px]" />
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,rgba(255,255,255,0.45),transparent_35%,rgba(0,0,0,0.35)_80%)]" />
            </div>
        );
    }

    if (type === "mars") {
        return (
            <div className="relative h-14 w-14 rounded-full bg-[radial-gradient(circle_at_30%_25%,#fed7aa,#c2410c_48%,#431407_88%)] shadow-[0_0_28px_rgba(239,106,58,0.48)]">
                <div className="absolute left-3 top-4 h-2 w-6 rounded-full bg-orange-950/35" />
                <div className="absolute bottom-4 right-3 h-2 w-5 rounded-full bg-orange-950/35" />
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,rgba(255,255,255,0.35),transparent_38%,rgba(0,0,0,0.35)_82%)]" />
            </div>
        );
    }

    if (type === "sun") {
        return (
            <div className="relative h-14 w-14 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff7ad,#fb923c_42%,#7c2d12_84%)] shadow-[0_0_34px_rgba(251,146,60,0.8)]">
                <motion.div
                    className="absolute inset-[-6px] rounded-full border border-orange-300/40"
                    animate={{scale: [1, 1.12, 1], opacity: [0.5, 1, 0.5]}}
                    transition={{duration: 3, repeat: Infinity}}
                />
                <div className="absolute inset-2 rounded-full border border-yellow-200/30" />
            </div>
        );
    }

    if (type === "asteroid") {
        return (
            <div className="relative h-14 w-14">
                <div className="absolute inset-2 rounded-[45%_55%_48%_52%] bg-[radial-gradient(circle_at_35%_25%,#f5d0a9,#a16207_46%,#3f2b12_86%)] shadow-[0_0_24px_rgba(245,158,11,0.35)] rotate-12" />
                <div className="absolute left-5 top-5 h-2 w-2 rounded-full bg-black/35" />
                <div className="absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-black/30" />
            </div>
        );
    }

    if (type === "exoplanet") {
        return (
            <div className="relative h-14 w-14 rounded-full bg-[radial-gradient(circle_at_30%_24%,#bfdbfe,#2563eb_45%,#172554_86%)] shadow-[0_0_28px_rgba(96,165,250,0.45)]">
                <div className="absolute left-[-8px] top-6 h-2 w-[72px] -rotate-12 rounded-full bg-cyan-200/35 blur-[1px]" />
                <div className="absolute inset-0 rounded-full bg-[linear-gradient(115deg,rgba(255,255,255,0.38),transparent_38%,rgba(0,0,0,0.45)_82%)]" />
            </div>
        );
    }

    if (type === "rocket") {
        return (
            <div className="relative h-14 w-14">
                <div className="absolute left-6 top-2 h-9 w-4 rounded-full bg-[linear-gradient(180deg,#f8fafc,#818cf8)] shadow-[0_0_24px_rgba(129,140,248,0.55)]" />
                <div className="absolute left-5 top-8 h-3 w-2 rotate-45 bg-violet-400" />
                <div className="absolute right-5 top-8 h-3 w-2 -rotate-45 bg-violet-400" />
                <div className="absolute left-[25px] bottom-1 h-5 w-2 rounded-full bg-[radial-gradient(circle,#fef3c7,#fb923c_60%,transparent_72%)] blur-[1px]" />
            </div>
        );
    }

    if (type === "satellite") {
        return (
            <div className="relative h-14 w-14">
                <div className="absolute left-5 top-5 h-4 w-4 rounded-md border border-cyan-300 bg-slate-900 shadow-[0_0_18px_rgba(56,189,248,0.45)]" />
                <div className="absolute left-0 top-6 h-3 w-5 border border-cyan-300/70 bg-cyan-300/15" />
                <div className="absolute right-0 top-6 h-3 w-5 border border-cyan-300/70 bg-cyan-300/15" />
                <div className="absolute left-7 top-8 h-7 w-px rotate-[-35deg] bg-cyan-300/80" />
            </div>
        );
    }

    if (type === "camera") {
        return (
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-violet-300/45 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.45),rgba(15,23,42,0.95))] shadow-[0_0_26px_rgba(168,85,247,0.35)]">
                <div className="h-7 w-8 rounded-lg border-2 border-violet-200" />
                <div className="absolute h-4 w-4 rounded-full border-2 border-violet-200" />
                <div className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-violet-200" />
            </div>
        );
    }

    if (type === "database") {
        return (
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-cyan-300/35 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.35),rgba(15,23,42,0.95))] shadow-[0_0_26px_rgba(56,189,248,0.3)]">
                <div className="h-8 w-8 rounded-[50%] border-2 border-cyan-200" />
                <div className="absolute top-5 h-3 w-8 rounded-[50%] border-2 border-cyan-200 bg-transparent" />
                <div className="absolute bottom-4 h-3 w-8 rounded-[50%] border-b-2 border-cyan-200" />
            </div>
        );
    }

    if (type === "book") {
        return (
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-violet-300/35 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.42),rgba(15,23,42,0.95))] shadow-[0_0_26px_rgba(139,92,246,0.35)]">
                <div className="h-8 w-7 rounded-l-md border-l-2 border-y-2 border-violet-100" />
                <div className="absolute right-4 h-8 w-7 rounded-r-md border-r-2 border-y-2 border-violet-100" />
                <div className="absolute h-8 w-px bg-violet-100/70" />
            </div>
        );
    }

    if (type === "calendar") {
        return (
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-violet-300/35 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.42),rgba(15,23,42,0.95))] shadow-[0_0_26px_rgba(99,102,241,0.35)]">
                <div className="h-8 w-8 rounded-md border-2 border-violet-100" />
                <div className="absolute top-[22px] h-0.5 w-8 bg-violet-100" />
                <div className="absolute bottom-5 grid grid-cols-3 gap-1">
                    <span className="h-1 w-1 rounded-full bg-violet-100" />
                    <span className="h-1 w-1 rounded-full bg-violet-100" />
                    <span className="h-1 w-1 rounded-full bg-violet-100" />
                </div>
            </div>
        );
    }

    if (type === "apod") {
        return (
            <div className="relative h-14 w-14 rounded-full bg-[radial-gradient(circle_at_50%_50%,#f8fafc_0_3%,transparent_4%),conic-gradient(from_30deg,#020617,#312e81,#0891b2,#020617,#581c87,#020617)] shadow-[0_0_28px_rgba(56,189,248,0.45)]">
                <div className="absolute inset-[9px] rounded-full border border-cyan-200/30" />
                <div className="absolute inset-[16px] rounded-full border border-violet-200/30" />
            </div>
        );
    }

    return (
        <div className="grid h-14 w-14 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-card)] text-2xl font-black text-[var(--color-text)] shadow-[var(--shadow-soft)]">
            ···
        </div>
    );
};

export const ModuleOrbitRail = () => {
    const {locale} = useLanguage();

    const modules: ModuleItem[] = [
        {label: "APOD", href: "/apod", visual: "apod"},
        {label: "Earth", href: "/earth", visual: "earth"},
        {label: "Mars", href: "/mars", visual: "mars"},
        {label: "Asteroids", href: "/asteroids", visual: "asteroid"},
        {label: "Space Weather", href: "/space-weather", visual: "sun"},
        {label: "Exoplanets", href: "/exoplanets", visual: "exoplanet"},
        {label: "Media Library", href: "/media", visual: "camera"},
        {label: "Tech Transfer", href: "/technology", visual: "satellite"},
        {label: "Open Data", href: "/datasets", visual: "database"},
        {label: "Education", href: "/learn", visual: "book"},
        {label: "Missions", href: "/missions", visual: "rocket"},
        {label: "Events", href: "/events", visual: "calendar"},
        {label: "More", href: "/explore", visual: "more"},
    ];

    return (
        <section className="px-4 pb-5 sm:px-6 lg:px-10">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <h2 className="text-lg font-black text-[var(--color-text)]">
                        {locale.spaceExperience.modulesTitle}
                    </h2>

                    <Link
                        href="/explore"
                        className="hidden items-center gap-2 text-sm font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)] sm:flex"
                    >
                        {locale.spaceExperience.viewAll}
                        <span>→</span>
                    </Link>
                </div>

                <div className="flex gap-5 overflow-x-auto pb-2">
                    {modules.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{opacity: 0, y: 18}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: index * 0.035}}
                            className="shrink-0"
                        >
                            <Link href={item.href} className="group flex w-24 flex-col items-center gap-3 text-center">
                                <div className="relative grid h-[76px] w-[76px] place-items-center rounded-full border border-[var(--color-border-strong)] bg-[rgba(2,6,23,0.38)] shadow-[var(--shadow-soft)] transition group-hover:-translate-y-1 group-hover:scale-105 dark:bg-[rgba(2,6,23,0.48)]">
                                    <motion.div
                                        className="absolute inset-[-7px] rounded-full border border-[var(--color-border)]"
                                        animate={{rotate: 360}}
                                        transition={{
                                            duration: 18 + index,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    />
                                    <ModuleVisual type={item.visual} />
                                </div>

                                <span className="text-xs font-semibold text-[var(--color-text)]">
                                    {item.label}
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};