"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {ArrowRight, SunMedium} from "lucide-react";

import type {NasaLiveDonki} from "@/src/types/nasaLive";

type Props = {
    locale: {
        donkiStream: string;
        solarFlares: string;
        geomagneticStorms: string;
        latestEvent: string;
        openSource: string;
        solarSignal?: string;
    };
    donki: NasaLiveDonki | null;
};

export const DonkiSolarModule = ({locale, donki}: Props) => {
    return (
        <Link href="/space-weather" className="group block">
            <motion.article
                initial={{opacity: 0, x: 24}}
                whileInView={{opacity: 1, x: 0}}
                whileHover={{x: -5}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.65, delay: 0.08}}
                className="relative min-h-[270px] overflow-hidden rounded-[2.4rem] border border-orange-300/10 bg-[linear-gradient(135deg,rgba(19,11,5,0.8),rgba(2,6,17,0.96))] p-7 backdrop-blur-xl"
            >
                <motion.div
                    className="absolute right-[-40px] top-[-70px] h-[220px] w-[220px] rounded-full bg-orange-300/14 blur-3xl"
                    animate={{scale: [1, 1.18, 1], opacity: [0.45, 0.9, 0.45]}}
                    transition={{duration: 3, repeat: Infinity}}
                />

                <motion.div
                    className="absolute right-8 top-8"
                    animate={{rotate: 360}}
                    transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                >
                    <SunMedium className="h-20 w-20 text-orange-300/16" />
                </motion.div>

                <div className="relative z-10 flex min-h-[216px] flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-300">
                        {locale.solarSignal ?? locale.donkiStream}
                    </p>

                    <div className="mt-7 flex items-end gap-4">
                        <h3 className="text-6xl font-black tracking-[-0.08em] text-white">
                            {donki?.cmeEvents ?? 0}
                        </h3>

                        <span className="mb-2 text-2xl font-black text-white">CME</span>
                    </div>

                    <div className="mt-7 grid grid-cols-2 gap-3">
                        <SolarChip label={locale.solarFlares} value={`${donki?.solarFlares ?? 0}`} />
                        <SolarChip label={locale.geomagneticStorms} value={`${donki?.geomagneticStorms ?? 0}`} />
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6">
                        <p className="text-xs text-slate-400">
                            {locale.latestEvent}:{" "}
                            <span className="font-bold text-white">
                                {donki?.latestEventDate ? donki.latestEventDate.slice(0, 16) : "—"}
                            </span>
                        </p>

                        <div className="flex items-center gap-3 text-orange-300">
                            <span className="text-xs font-black uppercase tracking-[0.18em]">
                                {locale.openSource}
                            </span>
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </motion.article>
        </Link>
    );
};

const SolarChip = ({label, value}: {label: string; value: string}) => (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <p className="mt-1 text-xl font-black text-white">{value}</p>
    </div>
);