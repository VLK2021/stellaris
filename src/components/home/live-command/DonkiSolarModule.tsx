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
                initial={{opacity: 0, y: 26}}
                whileInView={{opacity: 1, y: 0}}
                whileHover={{y: -6}}
                viewport={{once: true, margin: "-100px"}}
                transition={{duration: 0.7, delay: 0.16}}
                className="relative min-h-[520px] overflow-hidden rounded-[2.4rem] border border-orange-300/10 bg-[linear-gradient(180deg,rgba(19,11,5,0.72),rgba(2,6,17,0.96))] p-8 backdrop-blur-xl"
            >
                <motion.div
                    className="absolute right-[-55px] top-[-55px] h-[240px] w-[240px] rounded-full bg-orange-300/12 blur-3xl"
                    animate={{scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5]}}
                    transition={{duration: 3, repeat: Infinity}}
                />

                <motion.div
                    className="absolute right-10 top-10"
                    animate={{rotate: 360}}
                    transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                >
                    <SunMedium className="h-24 w-24 text-orange-300/18" />
                </motion.div>

                <div className="relative z-10 flex min-h-[456px] flex-col">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-orange-300/15 bg-orange-300/8">
                        <SunMedium className="h-6 w-6 text-orange-300" />
                    </div>

                    <p className="mt-10 text-[10px] font-black uppercase tracking-[0.3em] text-orange-300">
                        {locale.solarSignal ?? locale.donkiStream}
                    </p>

                    <h3 className="mt-6 text-6xl font-black tracking-[-0.08em] text-white">
                        {donki?.cmeEvents ?? 0} CME
                    </h3>

                    <div className="mt-10 space-y-4">
                        <SolarStat label={locale.solarFlares} value={`${donki?.solarFlares ?? 0}`} />
                        <SolarStat label={locale.geomagneticStorms} value={`${donki?.geomagneticStorms ?? 0}`} />
                        <SolarStat
                            label={locale.latestEvent}
                            value={donki?.latestEventDate ? donki.latestEventDate.slice(0, 16) : "—"}
                        />
                    </div>

                    <div className="mt-auto flex items-center gap-3 pt-8 text-orange-300">
                        <span className="text-sm font-black uppercase tracking-[0.2em]">
                            {locale.openSource}
                        </span>
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                </div>
            </motion.article>
        </Link>
    );
};

const SolarStat = ({label, value}: {label: string; value: string}) => (
    <div className="flex items-center justify-between border-b border-white/8 pb-3">
        <span className="text-sm text-slate-400">{label}</span>
        <span className="text-base font-black text-white">{value}</span>
    </div>
);