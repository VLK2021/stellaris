"use client";

import {Database, Orbit, RefreshCw} from "lucide-react";
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

    const earth = getAssetByKey(assets, "earth");
    const galaxy = getAssetByKey(assets, "galaxy");
    const sun = getAssetByKey(assets, "sun");

    const cards: TrustCardItem[] = [
        {
            title: locale.spaceExperience.trust.realTitle,
            text: locale.spaceExperience.trust.realText,
            href: "/open-data",
            action: locale.trustSection.actions.datasets,
            badge: locale.trustSection.badges.api,
            facts: ["APOD", "NeoWs", "DONKI"],
            image: earth,
            icon: Database,
            glow: "rgba(56,189,248,0.28)",
        },
        {
            title: locale.spaceExperience.trust.explorersTitle,
            text: locale.spaceExperience.trust.explorersText,
            href: "/explore",
            action: locale.trustSection.actions.modules,
            badge: locale.trustSection.badges.hub,
            facts: [
                locale.nav.earth,
                locale.nav.mars,
                locale.nav.missions,
            ],
            image: galaxy,
            icon: Orbit,
            glow: "rgba(139,92,246,0.26)",
        },
        {
            title: locale.spaceExperience.trust.updatedTitle,
            text: locale.spaceExperience.trust.updatedText,
            href: "/live",
            action: locale.trustSection.actions.live,
            badge: locale.trustSection.badges.live,
            facts: [
                locale.nav.asteroids,
                locale.nav.spaceWeather,
                locale.nav.media,
            ],
            image: sun,
            icon: RefreshCw,
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
                    className="mb-8 max-w-3xl"
                >
                    <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-success)] bg-clip-text text-2xl font-black tracking-[-0.045em] text-transparent sm:text-3xl lg:text-4xl">
                        {locale.trustSection.title}
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                        {locale.trustSection.text}
                    </p>
                </motion.div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {cards.map((card, index) => (
                        <TrustCard
                            key={card.href}
                            card={card}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};