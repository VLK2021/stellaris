"use client";

import Link from "next/link";
import {
    Aperture,
    BookOpen,
    CalendarDays,
    Camera,
    CircleEllipsis,
    CloudSun,
    Database,
    Earth,
    Orbit,
    Rocket,
    Satellite,
    Telescope,
} from "lucide-react";
import {motion} from "framer-motion";

import {useLanguage} from "@/src/context";

export const ModuleOrbitRail = () => {
    const {locale} = useLanguage();

    const modules = [
        {label: "APOD", href: "/apod", icon: Aperture},
        {label: "Earth", href: "/earth", icon: Earth},
        {label: "Mars", href: "/mars", icon: Orbit},
        {label: "Asteroids", href: "/asteroids", icon: Satellite},
        {label: "Space Weather", href: "/space-weather", icon: CloudSun},
        {label: "Exoplanets", href: "/exoplanets", icon: Telescope},
        {label: "Media Library", href: "/media", icon: Camera},
        {label: "Tech Transfer", href: "/technology", icon: Satellite},
        {label: "Open Data", href: "/datasets", icon: Database},
        {label: "Education", href: "/learn", icon: BookOpen},
        {label: "Missions", href: "/missions", icon: Rocket},
        {label: "Events", href: "/events", icon: CalendarDays},
        {label: "More", href: "/explore", icon: CircleEllipsis},
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
                    {modules.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <motion.div
                                key={item.href}
                                initial={{opacity: 0, y: 18}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: index * 0.035}}
                                className="shrink-0"
                            >
                                <Link href={item.href} className="group flex w-24 flex-col items-center gap-3 text-center">
                                    <div className="relative grid h-16 w-16 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-card)] text-[var(--color-accent)] shadow-[var(--shadow-soft)] transition group-hover:-translate-y-1 group-hover:scale-105">
                                        <div className="absolute inset-[-7px] rounded-full border border-[var(--color-border)] opacity-70" />
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <span className="text-xs font-semibold text-[var(--color-text)]">
                                        {item.label}
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};