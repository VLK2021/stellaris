"use client";

import {motion} from "framer-motion";

const orbitObjects = [
    {
        label: "Mars",
        className: "inset-[8%]",
        duration: 42,
        delay: -12,
        size: "h-10 w-10 sm:h-12 sm:w-12",
        planet:
            "bg-[radial-gradient(circle_at_32%_26%,#fed7aa,#ea580c_42%,#7c2d12_76%,#2b0d05_100%)]",
        glow: "shadow-[0_0_26px_rgba(239,106,58,0.45)]",
    },
    {
        label: "Earth",
        className: "inset-[21%]",
        duration: 28,
        delay: 0,
        size: "h-14 w-14 sm:h-16 sm:w-16",
        planet:
            "bg-[radial-gradient(circle_at_32%_26%,#eff6ff,#60a5fa_20%,#2563eb_36%,#0f766e_54%,#020617_88%)]",
        glow: "shadow-[0_0_34px_rgba(56,189,248,0.52)]",
    },
    {
        label: "Moon",
        className: "inset-[36%]",
        duration: 20,
        delay: -7,
        size: "h-7 w-7 sm:h-8 sm:w-8",
        planet:
            "bg-[radial-gradient(circle_at_35%_28%,#f8fafc,#cbd5e1_34%,#64748b_66%,#1e293b_96%)]",
        glow: "shadow-[0_0_20px_rgba(203,213,225,0.35)]",
    },
];

export const HeroOrbitVisual = () => {
    return (
        <motion.div
            initial={{opacity: 0, scale: 0.94}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.8, delay: 0.15}}
            className="relative z-10 mx-auto grid aspect-square w-full max-w-[340px] place-items-center sm:max-w-[500px] lg:max-w-[610px]"
        >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.07),transparent_68%)]" />

            <motion.div
                className="absolute inset-[3%] rounded-full border border-white/10"
                animate={{rotate: 360}}
                transition={{duration: 120, repeat: Infinity, ease: "linear"}}
            />

            <div className="absolute inset-[8%] rounded-full border border-orange-500/30" />
            <div className="absolute inset-[21%] rounded-full border border-cyan-400/32" />
            <div className="absolute inset-[36%] rounded-full border border-dashed border-white/16" />
            <div className="absolute inset-[48%] rounded-full border border-white/10" />

            <motion.div
                className="absolute inset-[12%] rounded-full border border-white/5"
                animate={{rotate: -360}}
                transition={{duration: 80, repeat: Infinity, ease: "linear"}}
            />

            <div className="relative grid h-[18%] w-[18%] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff7ad,#fb923c_42%,#7c2d12_78%,#431407_100%)] shadow-[0_0_80px_rgba(251,146,60,0.62)]">
                <motion.div
                    className="absolute inset-[-18px] rounded-full border border-orange-300/22"
                    animate={{scale: [1, 1.12, 1], opacity: [0.45, 1, 0.45]}}
                    transition={{duration: 4, repeat: Infinity}}
                />
                <motion.div
                    className="absolute inset-[-36px] rounded-full bg-orange-400/10 blur-xl"
                    animate={{scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3]}}
                    transition={{duration: 5, repeat: Infinity}}
                />
            </div>

            <motion.div
                className="absolute inset-[27%]"
                animate={{rotate: 360}}
                transition={{duration: 18, repeat: Infinity, ease: "linear"}}
            >
                <div className="absolute left-0 top-1/2 h-8 w-16 -translate-y-1/2 sm:h-9 sm:w-20">
                    <div className="h-1 w-full bg-slate-300/45" />
                    <div className="mt-1 grid grid-cols-3 gap-1">
                        <span className="h-5 border border-slate-300/35 bg-slate-400/10 sm:h-6" />
                        <span className="h-5 border border-slate-300/35 bg-slate-400/10 sm:h-6" />
                        <span className="h-5 border border-slate-300/35 bg-slate-400/10 sm:h-6" />
                    </div>
                </div>
            </motion.div>

            <div className="absolute left-[7%] top-[54%] hidden rounded-lg border border-white/15 bg-slate-950/70 px-3 py-2 text-[11px] font-semibold text-white shadow-[0_0_28px_rgba(56,189,248,0.18)] backdrop-blur-xl sm:block">
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
                            <div className={`${item.size} relative rounded-full ${item.planet} ${item.glow}`}>
                                <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.42),transparent_38%,rgba(0,0,0,0.46)_82%)]" />
                                <div className="absolute inset-[-3px] rounded-full border border-white/10" />
                            </div>

                            <div className="rounded-lg border border-white/15 bg-slate-950/70 px-3 py-2 text-[11px] font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,0.15)] backdrop-blur-xl">
                                <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                                {item.label}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    );
};