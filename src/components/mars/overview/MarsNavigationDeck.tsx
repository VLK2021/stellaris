import Link from "next/link";
import {ArrowRight, Camera, Orbit, RadioTower, Rocket} from "lucide-react";

import type {MarsLocale} from "@/src/types/mars";

const items: {
    href: string;
    icon: typeof Rocket;
    labelKey: keyof Pick<
        MarsLocale,
        "openRovers" | "openPhotos" | "openMissions" | "openCameras"
    >;
}[] = [
    {href: "/mars/rovers", icon: Rocket, labelKey: "openRovers"},
    {href: "/mars/photos", icon: Camera, labelKey: "openPhotos"},
    {href: "/mars/missions", icon: Orbit, labelKey: "openMissions"},
    {href: "/mars/cameras", icon: RadioTower, labelKey: "openCameras"},
];

export const MarsNavigationDeck = ({t}: {t: MarsLocale}) => {
    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-orange-200/12 bg-white/[0.035] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(249,115,22,.16),transparent_34%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                    {t.navigationTitle}
                </p>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
                    {t.navigationDescription}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group rounded-[1.4rem] border border-white/10 bg-black/25 p-4 transition hover:border-orange-300/45 hover:shadow-[0_0_44px_rgba(249,115,22,.16)]"
                            >
                                <Icon className="h-5 w-5 text-orange-300" />

                                <p className="mt-4 text-xl font-black uppercase tracking-[-0.04em] text-white">
                                    {t[item.labelKey]}
                                </p>

                                <p className="mt-3 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">
                                    Open
                                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};