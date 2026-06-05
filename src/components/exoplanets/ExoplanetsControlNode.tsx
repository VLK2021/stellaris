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
            initial={{opacity: 0, y: 20, scale: 0.94}}
            whileInView={{opacity: 1, y: 0, scale: 1}}
            viewport={{once: true, amount: 0.25}}
            transition={{duration: 0.35, delay: index * 0.05}}
            className={`xl:absolute xl:z-30 xl:w-[390px] ${node.position}`}
        >
            <Link
                href={node.href}
                className="group relative flex h-[250px] flex-col overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
            >
                <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)]">
                            <Icon className="h-5 w-5" />
                        </div>

                        <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                            {t.portal.online}
                        </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.04em]">
                        {node.title}
                    </h3>

                    <p className="exo-muted mt-2 overflow-hidden text-sm leading-6 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                        {node.text}
                    </p>

                    <p className="exo-label mt-auto pt-4 text-xs font-black uppercase tracking-[0.18em]">
                        {t.portal.open} →
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};