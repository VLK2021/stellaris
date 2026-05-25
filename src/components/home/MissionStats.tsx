"use client";

import {Database, ImageIcon, LockKeyhole, RadioTower, Workflow} from "lucide-react";
import {motion} from "framer-motion";

import {useLanguage} from "@/src/context";

export const MissionStats = () => {
    const {locale} = useLanguage();

    const stats = [
        {value: "98+", label: locale.spaceExperience.stats.datasets, icon: Database},
        {value: "24/7", label: locale.spaceExperience.stats.streams, icon: RadioTower},
        {value: "15+", label: locale.spaceExperience.stats.apis, icon: Workflow},
        {value: "1M+", label: locale.spaceExperience.stats.media, icon: ImageIcon},
        {value: "100%", label: locale.spaceExperience.stats.open, icon: LockKeyhole},
    ];

    return (
        <section className="px-4 pb-5 sm:px-6 lg:px-10">
            <motion.div
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                className="grid gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-5"
            >
                {stats.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div key={item.label} className="flex items-center gap-4 lg:border-r lg:border-[var(--color-border)] lg:last:border-r-0">
                            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                <Icon className="h-7 w-7" />
                            </div>

                            <div>
                                <div className="text-2xl font-black text-[var(--color-text)]">
                                    {item.value}
                                </div>
                                <div className="mt-1 text-xs text-[var(--color-text-muted)]">
                                    {item.label}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </section>
    );
};