"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import type {LucideIcon} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

type Node = {
    href: string;
    title: string;
    text: string;
    icon: LucideIcon;
    position: string;
};

type Props = {
    node: Node;
    index: number;
    t: ExoplanetsLocale;
};

export const ExoplanetsControlNode = ({node, index, t}: Props) => {
    const Icon = node.icon;

    return (
        <motion.div
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.3, delay: index * 0.04}}
            className={`xl:absolute xl:z-30 xl:w-[390px] ${node.position}`}
            style={{
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
            }}
        >
            <Link
                href={node.href}
                className="group relative block min-h-[175px] overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-[var(--color-accent)]"
                style={{
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    WebkitFontSmoothing: "antialiased",
                }}
            >
                <div
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{background: "var(--hero-bg)"}}
                />

                <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:30px_30px]" />

                <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-45" />

                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)] transition-colors duration-200 group-hover:border-[var(--color-accent)]">
                            <Icon className="h-5 w-5" />
                        </div>

                        <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                            {t.portal.online}
                        </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.04em]">
                        {node.title}
                    </h3>

                    <p className="exo-muted mt-2 text-sm leading-6">
                        {node.text}
                    </p>

                    <p className="exo-label mt-4 text-xs font-black uppercase tracking-[0.18em]">
                        {t.portal.open} →
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};