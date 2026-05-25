"use client";

import {motion} from "framer-motion";

type StellarisLogoProps = {
    subtitle?: string;
};

export const StellarisLogo = ({subtitle}: StellarisLogoProps) => {
    return (
        <div className="group flex items-center gap-3">
            <div className="relative grid h-12 w-12 place-items-center">
                <motion.div
                    className="absolute inset-0 rounded-full border border-[rgba(56,189,248,0.55)]"
                    animate={{rotate: 360}}
                    transition={{duration: 18, repeat: Infinity, ease: "linear"}}
                />

                <motion.div
                    className="absolute inset-[5px] rounded-full border border-dashed border-[rgba(139,92,246,0.55)]"
                    animate={{rotate: -360}}
                    transition={{duration: 26, repeat: Infinity, ease: "linear"}}
                />

                <motion.div
                    className="absolute h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)]"
                    animate={{
                        x: [0, 18, 0, -18, 0],
                        y: [-18, 0, 18, 0, -18],
                    }}
                    transition={{duration: 5, repeat: Infinity, ease: "linear"}}
                />

                <svg
                    viewBox="0 0 64 64"
                    className="relative h-8 w-8 drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]"
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="stellaris-core" x1="8" y1="8" x2="56" y2="56">
                            <stop stopColor="#38BDF8" />
                            <stop offset="0.52" stopColor="#8B5CF6" />
                            <stop offset="1" stopColor="#EC4899" />
                        </linearGradient>
                    </defs>

                    <path
                        d="M32 4L38.8 24.2L60 32L38.8 39.8L32 60L25.2 39.8L4 32L25.2 24.2L32 4Z"
                        fill="url(#stellaris-core)"
                    />

                    <circle cx="32" cy="32" r="7" fill="#020617" opacity="0.9" />
                    <circle cx="32" cy="32" r="3" fill="#F8FAFC" />
                </svg>
            </div>

            <div className="leading-none">
                <div className="text-lg font-black tracking-[0.32em] text-[var(--color-text)]">
                    STELLARIS
                </div>

                {subtitle && (
                    <div className="mt-1 hidden text-[10px] uppercase tracking-[0.32em] text-[var(--color-text-muted)] sm:block">
                        {subtitle}
                    </div>
                )}
            </div>
        </div>
    );
};