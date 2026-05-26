"use client";

import Link from "next/link";
import {motion} from "framer-motion";

import type {ModuleItem} from "./moduleOrbitRail.data";
import {ModuleOrbitRailVisual} from "./ModuleOrbitRailVisual";

type Props = {
    item: ModuleItem;
    index: number;
};

export const ModuleOrbitRailCard = ({item, index}: Props) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 14}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: index * 0.025, duration: 0.45}}
            className="min-w-0"
        >
            <Link
                href={item.href}
                className="group flex min-w-0 flex-col items-center gap-2 text-center"
            >
                <motion.div
                    whileHover={{y: -6, scale: 1.06}}
                    transition={{type: "spring", stiffness: 260, damping: 18}}
                    className="relative grid h-[82px] w-[82px] place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl"
                >
                    <motion.div
                        className="absolute inset-[-7px] rounded-full border border-[var(--color-border)]"
                        animate={{rotate: 360}}
                        transition={{
                            duration: 20 + index,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />

                    <ModuleOrbitRailVisual visual={item.visual} />
                </motion.div>

                <span className="line-clamp-2 min-h-[30px] text-[11px] font-bold leading-4 text-[var(--color-text-muted)] transition group-hover:text-[var(--color-accent)]">
                    {item.label}
                </span>
            </Link>
        </motion.div>
    );
};