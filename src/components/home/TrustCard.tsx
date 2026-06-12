"use client";

import Image from "next/image";
// import Link from "next/link";
import {motion} from "framer-motion";
// import {ArrowRight} from "lucide-react";

import type {TrustCardItem} from "@/src/types/trustCards";

type Props = {
    card: TrustCardItem;
    index: number;
};

export const TrustCard = ({card, index}: Props) => {
    const Icon = card.icon;

    return (
        <motion.article
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: "-80px"}}
            transition={{duration: 0.55, delay: index * 0.08}}
            whileHover={{y: -6}}
            className="group relative min-h-[330px] overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-glass)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl"
        >
            {card.image && (
                <Image
                    src={card.image.imageUrl}
                    alt={card.image.title}
                    fill
                    sizes="33vw"
                    className="object-cover opacity-[0.14] transition duration-500 group-hover:scale-105 group-hover:opacity-[0.22]"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-background)]/20 to-[var(--color-background)]/72" />

            <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-70 blur-3xl"
                style={{background: card.glow}}
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div className="grid h-13 w-13 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-soft)]">
                            <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                        </div>

                        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {card.badge}
                        </span>
                    </div>

                    <h3 className="text-xl font-black tracking-[-0.035em] text-[var(--color-text)] sm:text-2xl">
                        {card.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
                        {card.text}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                        {card.facts.map((fact) => (
                            <span
                                key={fact}
                                className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-1 text-xs font-semibold text-[var(--color-text-muted)]"
                            >
                                {fact}
                            </span>
                        ))}
                    </div>
                </div>

                {/*<Link*/}
                {/*    href={card.href}*/}
                {/*    className="mt-7 inline-flex items-center gap-2 text-sm font-black text-[var(--color-accent)] transition group-hover:gap-3"*/}
                {/*>*/}
                {/*    {card.action}*/}
                {/*    <ArrowRight className="h-4 w-4" />*/}
                {/*</Link>*/}
            </div>
        </motion.article>
    );
};