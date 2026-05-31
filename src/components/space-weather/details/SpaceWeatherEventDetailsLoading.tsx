"use client";

import {motion} from "framer-motion";
import {Activity, RadioTower, Satellite} from "lucide-react";

export const SpaceWeatherEventDetailsLoading = () => {
    return (
        <section className="grid min-h-[calc(100vh-180px)] place-items-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card-deep)] p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_48%,rgba(234,88,12,0.22),transparent_34%),radial-gradient(circle_at_86%_38%,var(--color-accent-soft),transparent_35%)]" />

                <motion.div
                    className="absolute left-[-35%] top-1/2 h-[2px] w-[85%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[var(--color-warning)] to-transparent blur-[1px]"
                    animate={{x: ["0%", "190%"], opacity: [0, 0.9, 0]}}
                    transition={{duration: 2.4, repeat: Infinity, ease: "easeInOut"}}
                />

                <div className="relative z-10 grid gap-8 lg:grid-cols-[320px_1fr] lg:items-center">
                    <div className="grid place-items-center">
                        <div className="relative h-56 w-56">
                            <motion.div
                                className="absolute inset-0 rounded-full border border-[var(--color-accent)]/25"
                                animate={{rotate: 360}}
                                transition={{duration: 12, repeat: Infinity, ease: "linear"}}
                            />

                            <motion.div
                                className="absolute inset-8 rounded-full border border-[var(--color-warning)]/25"
                                animate={{rotate: -360}}
                                transition={{duration: 9, repeat: Infinity, ease: "linear"}}
                            />

                            <motion.div
                                className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle,var(--color-warning),rgba(234,88,12,0.2)_62%,transparent_74%)] shadow-[0_0_90px_rgba(234,88,12,0.35)]"
                                animate={{scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8]}}
                                transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                            >
                                <Activity className="h-9 w-9 text-white" />
                            </motion.div>

                            {[0, 1, 2].map((item) => (
                                <motion.span
                                    key={item}
                                    className="absolute h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_18px_var(--color-accent)]"
                                    style={{
                                        left: `${24 + item * 23}%`,
                                        top: `${22 + (item % 2) * 48}%`,
                                    }}
                                    animate={{scale: [1, 1.8, 1], opacity: [0.35, 1, 0.35]}}
                                    transition={{
                                        duration: 1.8 + item * 0.25,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                            <RadioTower className="h-3.5 w-3.5" />
                            NASA DONKI
                        </div>

                        <h2 className="mt-5 text-2xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)] sm:text-3xl">
                            Loading Event Dossier
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
                            Receiving normalized NASA space weather data, raw DONKI payload,
                            linked events and observation metadata.
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {[
                                "Event core",
                                "NASA payload",
                                "Linked events",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                                >
                                    <Satellite className="h-4 w-4 text-[var(--color-accent)]" />
                                    <p className="mt-3 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                                        {item}
                                    </p>
                                    <div className="mt-3 h-2 rounded-full bg-[var(--color-glass-strong)]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};