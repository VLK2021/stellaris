"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import type {LucideIcon} from "lucide-react";

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
};

export const ExoplanetsControlNode = ({node, index}: Props) => {
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
                className="group relative block min-h-[175px] overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
            >
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-50"
                    style={{background: "var(--hero-bg)"}}
                    animate={{x: ["-20%", "20%", "-20%"]}}
                    transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                />

                <motion.div
                    className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                    animate={{x: ["-100%", "100%"]}}
                    transition={{duration: 3.5, repeat: Infinity, ease: "linear"}}
                />

                <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4">
                        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-accent)]">
                            <Icon className="h-5 w-5" />
                        </div>

                        <span className="exo-label text-[10px] font-black uppercase tracking-[0.18em]">
                            Online
                        </span>
                    </div>

                    <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.04em]">
                        {node.title}
                    </h3>

                    <p className="exo-muted mt-2 text-sm leading-6">
                        {node.text}
                    </p>

                    <p className="exo-label mt-4 text-xs font-black uppercase tracking-[0.18em]">
                        Відкрити →
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};