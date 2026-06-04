"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowLeft} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import type {ExoplanetDetails} from "./ExoplanetDetailsPage";
import {ExoplanetMissionRail} from "./ExoplanetMissionRail";
import {ExoplanetScienceConsole} from "./ExoplanetScienceConsole";
import {ExoplanetTelemetry} from "./ExoplanetTelemetry";
import {ExoplanetVisualPlanet} from "./ExoplanetVisualPlanet";

type Props = {
    data: ExoplanetDetails;
    t: ExoplanetsLocale["details"];
};

export const ExoplanetSpaceScene = ({data, t}: Props) => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
            <div className="fixed inset-0 opacity-95" style={{background: "var(--body-bg)"}} />

            <motion.div
                className="fixed inset-0"
                style={{
                    background:
                        "radial-gradient(circle at 18% 22%, var(--color-accent-soft), transparent 34%), radial-gradient(circle at 84% 18%, rgba(139,92,246,.18), transparent 36%), radial-gradient(circle at 52% 110%, rgba(236,72,153,.13), transparent 38%)",
                }}
                animate={{scale: [1, 1.05, 1], opacity: [0.65, 1, 0.65]}}
                transition={{duration: 14, repeat: Infinity, ease: "easeInOut"}}
            />

            <motion.div
                className="fixed inset-0 opacity-30 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:34px_34px]"
                animate={{x: [0, -18, 0], y: [0, 14, 0]}}
                transition={{duration: 18, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="fixed inset-0 opacity-[0.1] [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:90px_90px]" />

            <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
                <Link
                    href="/exoplanets/catalog"
                    className="group mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--color-accent)] backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                >
                    <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                    {t.back}
                </Link>

                <section className="relative min-h-[760px] overflow-hidden rounded-[2.6rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
                    <motion.div
                        className="absolute inset-0"
                        style={{background: "var(--hero-bg)"}}
                        animate={{opacity: [0.42, 0.8, 0.42]}}
                        transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
                    />

                    <motion.div
                        className="absolute left-0 top-[18%] h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                        animate={{x: ["-25%", "25%", "-25%"], opacity: [0.08, 0.5, 0.08]}}
                        transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
                    />

                    <div className="relative z-10 flex min-h-[760px] flex-col gap-5 p-5 lg:p-7">
                        <div className="grid flex-1 gap-5 xl:grid-cols-[260px_1fr_330px]">
                            <ExoplanetMissionRail data={data} t={t} />
                            <ExoplanetVisualPlanet data={data} t={t} />
                            <ExoplanetTelemetry data={data} t={t} />
                        </div>

                        <ExoplanetScienceConsole data={data} t={t} />
                    </div>
                </section>
            </div>
        </main>
    );
};