"use client";

import {motion} from "framer-motion";

const orbitObjects = [
    {
        label: "Mars",
        className: "inset-[7%]",
        duration: 42,
        delay: -12,
        size: "h-12 w-12 sm:h-14 sm:w-14",
        planet:
            "bg-[radial-gradient(circle_at_35%_28%,#f59e73,#c2410c_45%,#4a1609_82%)]",
    },
    {
        label: "Earth",
        className: "inset-[20%]",
        duration: 28,
        delay: 0,
        size: "h-12 w-12 sm:h-14 sm:w-14",
        planet:
            "bg-[radial-gradient(circle_at_35%_28%,#dbeafe,#2563eb_36%,#0f766e_52%,#020617_84%)]",
    },
    {
        label: "Moon",
        className: "inset-[34%]",
        duration: 20,
        delay: -7,
        size: "h-9 w-9 sm:h-10 sm:w-10",
        planet:
            "bg-[radial-gradient(circle_at_35%_28%,#f8fafc,#94a3b8_50%,#334155_84%)]",
    },
];

export const HeroOrbitVisual = () => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.94}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.8, delay: 0.15}}
            className="relative mx-auto grid aspect-square w-full max-w-[360px] place-items-center sm:max-w-[520px] lg:max-w-[620px]"
        >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,var(--color-accent-soft),transparent_68%)]" />

            <motion.div
                className="absolute inset-[2%] rounded-full border border-[var(--color-border)]"
                animate={{rotate: 360}}
                transition={{duration: 120, repeat: Infinity, ease: "linear"}}
            />

            <div className="absolute inset-[7%] rounded-full border border-[var(--color-mars)]/35" />
            <div className="absolute inset-[20%] rounded-full border border-[var(--color-earth)]/40" />
            <div className="absolute inset-[34%] rounded-full border border-dashed border-[var(--color-border-strong)]" />
            <div className="absolute inset-[46%] rounded-full border border-[var(--color-border)]" />

            <div className="relative grid h-[22%] w-[22%] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff7ad,#fb923c_42%,#7c2d12_78%)] shadow-[0_0_90px_rgba(251,146,60,0.62)]">
                <motion.div
                    className="absolute inset-[-22px] rounded-full border border-[var(--color-sun)]/25"
                    animate={{scale: [1, 1.12, 1], opacity: [0.45, 1, 0.45]}}
                    transition={{duration: 4, repeat: Infinity}}
                />
            </div>

            <motion.div
                className="absolute inset-[24%]"
                animate={{rotate: 360}}
                transition={{duration: 18, repeat: Infinity, ease: "linear"}}
            >
                <div className="absolute left-0 top-1/2 h-8 w-16 -translate-y-1/2">
                    <div className="h-1 w-16 bg-[var(--color-text-muted)]" />
                    <div className="mt-1 grid grid-cols-3 gap-1">
                        <span className="h-5 border border-[var(--color-border-strong)] bg-[var(--color-glass)]" />
                        <span className="h-5 border border-[var(--color-border-strong)] bg-[var(--color-glass)]" />
                        <span className="h-5 border border-[var(--color-border-strong)] bg-[var(--color-glass)]" />
                    </div>
                </div>
            </motion.div>

            <div className="absolute left-[9%] top-[53%] rounded-lg border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-3 py-2 text-xs font-semibold text-[var(--color-text)] backdrop-blur-xl">
                International
                <br />
                Space Station
            </div>

            {orbitObjects.map((item) => (
                <motion.div
                    key={item.label}
                    className={`absolute ${item.className} rounded-full`}
                    animate={{rotate: 360}}
                    transition={{
                        duration: item.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: item.delay,
                    }}
                >
                    <motion.div
                        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                        animate={{rotate: -360}}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: item.delay,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <div className={`${item.size} rounded-full ${item.planet} shadow-[0_0_30px_rgba(56,189,248,0.28)]`} />
                            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-3 py-2 text-xs font-semibold text-[var(--color-text)] backdrop-blur-xl">
                                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                                {item.label}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
};