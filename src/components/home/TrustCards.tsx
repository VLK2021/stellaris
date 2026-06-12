"use client";

import {Database, Orbit, Radar} from "lucide-react";
import {motion} from "framer-motion";

import type {NasaAsset} from "@/src/types/nasa";
import type {TrustCardItem} from "@/src/types/trustCards";

import {getAssetByKey} from "@/src/helpers";
import {useLanguage} from "@/src/context";

import {TrustCard} from "./TrustCard";

type Props = {
    assets: NasaAsset[];
};

export const TrustCards = ({assets}: Props) => {
    const {locale} = useLanguage();
    const t = locale.platformPrinciples;

    const earth = getAssetByKey(assets, "earth");
    const galaxy = getAssetByKey(assets, "galaxy");
    const sun = getAssetByKey(assets, "sun");

    const cards: TrustCardItem[] = [
        {
            title: t.cards.openData.title,
            text: t.cards.openData.text,
            href: "/manifest",
            action: "",
            badge: t.cards.openData.badge,
            facts: t.cards.openData.facts,
            image: earth,
            icon: Database,
            glow: "rgba(56,189,248,0.28)",
        },
        {
            title: t.cards.cinematic.title,
            text: t.cards.cinematic.text,
            href: "/manifest",
            action: "",
            badge: t.cards.cinematic.badge,
            facts: t.cards.cinematic.facts,
            image: galaxy,
            icon: Orbit,
            glow: "rgba(139,92,246,0.26)",
        },
        {
            title: t.cards.exploration.title,
            text: t.cards.exploration.text,
            href: "/manifest",
            action: "",
            badge: t.cards.exploration.badge,
            facts: t.cards.exploration.facts,
            image: sun,
            icon: Radar,
            glow: "rgba(16,185,129,0.24)",
        },
    ];

    return (
        <section className="relative px-4 pb-16 pt-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-[1800px]">
                <motion.div
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true, margin: "-80px"}}
                    transition={{duration: 0.55}}
                    className="mb-8 max-w-4xl"
                >
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        Stellaris Foundation
                    </p>

                    <h2 className="mt-3 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-success)] bg-clip-text text-2xl font-black tracking-[-0.045em] text-transparent sm:text-3xl lg:text-4xl">
                        {t.title}
                    </h2>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                        {t.text}
                    </p>
                </motion.div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {cards.map((card, index) => (
                        <TrustCard
                            key={card.title}
                            card={card}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};