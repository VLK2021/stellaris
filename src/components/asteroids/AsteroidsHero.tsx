"use client";

import {motion} from "framer-motion";
import {Activity, Orbit, Radar} from "lucide-react";

import type {AsteroidsLocale} from "@/src/types/asteroids/asteroidsUi.types";

type Props = {
    locale: AsteroidsLocale;
};

export const AsteroidsHero = ({locale}: Props) => {
    return (
        <section
            className="relative overflow-hidden rounded-[1.9rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-7 lg:p-9">
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_74%_42%,var(--color-accent-soft),transparent_32%),radial-gradient(circle_at_18%_78%,rgba(234,88,12,0.12),transparent_34%)]"/>

            <div
                className="absolute right-[-80px] top-[-90px] hidden h-[360px] w-[360px] rounded-full border border-[var(--color-border)] opacity-70 lg:block"/>
            <div
                className="absolute right-[-20px] top-[-30px] hidden h-[240px] w-[240px] rounded-full border border-[var(--color-border-strong)] opacity-50 lg:block"/>

            <motion.div
                className="absolute right-28 top-20 hidden h-28 w-28 rounded-full border border-[var(--color-accent)]/35 lg:block"
                animate={{rotate: 360}}
                transition={{duration: 22, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute right-[8.4rem] top-[6.2rem] hidden h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_24px_var(--color-accent)] lg:block"
                animate={{scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5]}}
                transition={{duration: 2.4, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="absolute bottom-8 right-8 hidden h-[1px] w-[300px] rotate-[-22deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent lg:block"
                animate={{x: [-80, 80], opacity: [0, 0.6, 0]}}
                transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 grid gap-7 lg:grid-cols-[1fr_420px] lg:items-center">
                <div className="max-w-4xl">
                    <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        <Radar className="h-3.5 w-3.5"/>
                        {locale.badge}
                    </p>

                    <h1 className="mt-3 text-2xl font-black uppercase tracking-[-0.01em] text-[var(--color-text)] sm:text-3xl lg:text-[38px] xl:text-[42px]">
                        <span>NEAR&nbsp;</span>
                        <span className="text-[var(--color-accent)]">EARTH</span>
                        <span>&nbsp;OBJECT&nbsp;</span>
                        <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-warning)] bg-clip-text text-transparent">TRACKER</span>
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                        {locale.text}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <MiniSignal icon={Activity} label="NASA JPL"/>
                        <MiniSignal icon={Orbit} label="NEO TRACKING"/>
                        <MiniSignal icon={Radar} label="REAL DATA"/>
                    </div>
                </div>

                <div className="relative hidden min-h-[260px] lg:block">
                    <motion.div
                        className="absolute inset-0 rounded-full border border-[var(--color-border)]"
                        animate={{rotate: 360}}
                        transition={{duration: 34, repeat: Infinity, ease: "linear"}}
                    />
                    <motion.div
                        className="absolute inset-10 rounded-full border border-[var(--color-border)]"
                        animate={{rotate: -360}}
                        transition={{duration: 28, repeat: Infinity, ease: "linear"}}
                    />
                    <div
                        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-soft)] blur-xl"/>
                    <div
                        className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-glass)] text-[var(--color-accent)]">
                        <Radar className="h-7 w-7"/>
                    </div>

                    {[0, 1, 2, 3].map((item) => (
                        <motion.span
                            key={item}
                            className="absolute h-2.5 w-2.5 rounded-full bg-[var(--color-warning)] shadow-[0_0_18px_var(--color-warning)]"
                            style={{
                                left: `${28 + item * 15}%`,
                                top: `${22 + (item % 2) * 42}%`,
                            }}
                            animate={{
                                scale: [1, 1.7, 1],
                                opacity: [0.45, 1, 0.45],
                            }}
                            transition={{
                                duration: 2 + item * 0.35,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const MiniSignal = ({
                        icon: Icon,
                        label,
                    }: {
    icon: typeof Activity;
    label: string;
}) => (
    <div
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        <Icon className="h-3.5 w-3.5 text-[var(--color-accent)]"/>
        {label}
    </div>
);