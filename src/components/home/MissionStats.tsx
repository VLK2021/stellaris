"use client";

import {motion} from "framer-motion";

import {useLanguage} from "@/src/context";

export const MissionStats = () => {
    const {locale} = useLanguage();

    const stats = [
        {value: "15+", label: locale.home.stats.dataSources},
        {value: "12", label: locale.home.stats.modules},
        {value: "100%", label: locale.home.stats.experience},
    ];

    return (
        <section className="px-4 pb-10 sm:px-6 lg:px-10">
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, margin: "-80px"}}
                        transition={{delay: index * 0.08}}
                        className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] p-6 backdrop-blur-2xl"
                    >
                        <div className="text-4xl font-black tracking-[-0.05em] text-[var(--color-text)]">
                            {item.value}
                        </div>
                        <div className="mt-2 text-sm uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                            {item.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};