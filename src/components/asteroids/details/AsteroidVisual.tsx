"use client";

import {motion} from "framer-motion";

export const AsteroidVisual = () => {
    return (
        <div className="relative min-h-[280px] overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card-deep)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-soft),transparent_42%)]" />

            <motion.div
                className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)]"
                animate={{rotate: 360}}
                transition={{duration: 26, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border-strong)]"
                animate={{rotate: -360}}
                transition={{duration: 20, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-28 w-32 -translate-x-1/2 -translate-y-1/2 rounded-[45%_55%_48%_52%] bg-[radial-gradient(circle_at_35%_28%,rgba(255,255,255,0.28),transparent_18%),linear-gradient(135deg,var(--color-warning),var(--color-mars),var(--color-card-deep))] shadow-[0_0_70px_var(--color-accent-soft)]"
                animate={{
                    rotate: 360,
                    scale: [1, 1.04, 1],
                }}
                transition={{
                    rotate: {duration: 18, repeat: Infinity, ease: "linear"},
                    scale: {duration: 4, repeat: Infinity, ease: "easeInOut"},
                }}
            />

            {[0, 1, 2, 3, 4].map((item) => (
                <motion.span
                    key={item}
                    className="absolute h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)]"
                    style={{
                        left: `${18 + item * 14}%`,
                        top: `${28 + (item % 2) * 36}%`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.8, 1],
                    }}
                    transition={{
                        duration: 2 + item * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};