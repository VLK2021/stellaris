"use client";

import {motion} from "framer-motion";
import type {ReactNode} from "react";

type Props = {
    title: string;
    children: ReactNode;
};

export const EarthPanel = ({title, children}: Props) => {
    return (
        <motion.section
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, amount: 0.15}}
            transition={{duration: 0.45, ease: "easeOut"}}
            className="relative overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl"
        >
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.18, 0.38, 0.18]}}
                transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                animate={{x: ["-100%", "100%"]}}
                transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />

            <h2 className="relative z-10 mb-4 text-xl font-black uppercase tracking-[-0.04em]">
                {title}
            </h2>

            <div className="relative z-10">{children}</div>
        </motion.section>
    );
};