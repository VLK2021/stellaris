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
        <section className="px-4 pb-8 sm:px-6 lg:px-10">
            <div className="grid gap-3 md:grid-cols-3">
                {stats.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{opacity: 0, y: 18}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, margin: "-80px"}}
                        transition={{delay: index * 0.08}}
                        whileHover={{y: -5, scale: 1.01}}
                        className="border border-[var(--color-border)] bg-[rgba(255,255,255,0.04)] p-5 backdrop-blur-2xl transition"
                    >
                        <div className="text-3xl font-black tracking-[-0.05em] text-[var(--color-text)] sm:text-4xl">
                            {item.value}
                        </div>

                        <div className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                            {item.label}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};