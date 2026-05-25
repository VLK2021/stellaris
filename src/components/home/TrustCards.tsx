"use client";

import {RefreshCw, Rocket, ShieldCheck} from "lucide-react";
import {motion} from "framer-motion";

import {useLanguage} from "@/src/context";

export const TrustCards = () => {
    const {locale} = useLanguage();

    const cards = [
        {
            title: locale.spaceExperience.trust.realTitle,
            text: locale.spaceExperience.trust.realText,
            icon: ShieldCheck,
        },
        {
            title: locale.spaceExperience.trust.explorersTitle,
            text: locale.spaceExperience.trust.explorersText,
            icon: Rocket,
        },
        {
            title: locale.spaceExperience.trust.updatedTitle,
            text: locale.spaceExperience.trust.updatedText,
            icon: RefreshCw,
        },
    ];

    return (
        <section className="px-4 pb-12 sm:px-6 lg:px-10">
            <div className="grid gap-4 lg:grid-cols-3">
                {cards.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <motion.article
                            key={item.title}
                            initial={{opacity: 0, y: 24}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: index * 0.08}}
                            className="flex gap-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl"
                        >
                            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-[var(--color-accent-soft)] text-[var(--color-nebula)] shadow-[var(--shadow-soft)]">
                                <Icon className="h-8 w-8" />
                            </div>

                            <div>
                                <h3 className="text-lg font-black text-[var(--color-text)]">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
                                    {item.text}
                                </p>
                            </div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
};