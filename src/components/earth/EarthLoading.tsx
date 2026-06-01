"use client";

import {motion} from "framer-motion";
import {Globe2, Satellite} from "lucide-react";

export const EarthLoading = () => {
    return (
        <section className="grid min-h-[calc(100vh-180px)] place-items-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card-deep)] p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_45%,rgba(34,197,94,0.18),transparent_32%),radial-gradient(circle_at_76%_42%,var(--color-accent-soft),transparent_35%)]" />

                <motion.div
                    className="absolute left-[-30%] top-1/2 h-[2px] w-[80%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px]"
                    animate={{x: ["0%", "180%"], opacity: [0, 0.9, 0]}}
                    transition={{duration: 2.6, repeat: Infinity, ease: "easeInOut"}}
                />

                <div className="relative z-10 grid gap-8 lg:grid-cols-[300px_1fr] lg:items-center">
                    <div className="grid place-items-center">
                        <div className="relative h-56 w-56">
                            <motion.div
                                className="absolute inset-0 rounded-full border border-[var(--color-accent)]/25"
                                animate={{rotate: 360}}
                                transition={{duration: 14, repeat: Infinity, ease: "linear"}}
                            />

                            <motion.div
                                className="absolute inset-8 rounded-full border border-emerald-400/25"
                                animate={{rotate: -360}}
                                transition={{duration: 10, repeat: Infinity, ease: "linear"}}
                            />

                            <motion.div
                                className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.95),rgba(14,165,233,0.24)_62%,transparent_74%)] shadow-[0_0_90px_rgba(34,197,94,0.28)]"
                                animate={{scale: [1, 1.08, 1]}}
                                transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                            >
                                <Globe2 className="h-9 w-9 text-white" />
                            </motion.div>
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                            <Satellite className="h-3.5 w-3.5" />
                            NASA EARTH DATA
                        </div>

                        <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)] sm:text-3xl">
                            Loading Earth Intelligence
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
                            Receiving NASA EONET events, EPIC Earth imagery and GIBS satellite layers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};