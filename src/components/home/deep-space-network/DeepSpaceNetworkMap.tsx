"use client";

import {motion} from "framer-motion";

import {DEEP_SPACE_SIGNALS} from "@/src/constants/deepSpaceNetwork.constants";
import type {DeepSpaceNetworkLocale} from "@/src/types/deepSpaceNetwork";

import {DeepSpaceNetworkCore} from "./DeepSpaceNetworkCore";
import {DeepSpaceSignalNode} from "./DeepSpaceSignalNode";

type Props = {
    locale: DeepSpaceNetworkLocale;
};

export const DeepSpaceNetworkMap = ({locale}: Props) => {
    return (
        <div className="absolute inset-0 hidden lg:block">
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-90" viewBox="0 0 1400 760" preserveAspectRatio="none">
                <ellipse cx="820" cy="380" rx="335" ry="180" stroke="rgba(34,211,238,.24)" fill="none" />
                <ellipse cx="820" cy="380" rx="430" ry="245" stroke="rgba(59,130,246,.17)" fill="none" />
                <ellipse cx="820" cy="380" rx="535" ry="315" stroke="rgba(168,85,247,.12)" fill="none" />

                <motion.ellipse cx="820" cy="380" rx="382" ry="215" stroke="rgba(34,211,238,.58)" strokeWidth="1.4" fill="none" strokeDasharray="90 820" animate={{strokeDashoffset: [0, -910]}} transition={{duration: 8, repeat: Infinity, ease: "linear"}} />
                <motion.ellipse cx="820" cy="380" rx="500" ry="292" stroke="rgba(96,165,250,.42)" strokeWidth="1.2" fill="none" strokeDasharray="80 900" animate={{strokeDashoffset: [0, 980]}} transition={{duration: 11, repeat: Infinity, ease: "linear"}} />

                <path d="M820 380 C690 270 590 185 520 120" stroke="rgba(34,211,238,.18)" fill="none" />
                <path d="M820 380 C950 280 1030 220 1110 160" stroke="rgba(34,211,238,.18)" fill="none" />
                <path d="M820 380 C660 360 570 350 470 315" stroke="rgba(34,211,238,.14)" fill="none" />
                <path d="M820 380 C1010 365 1120 360 1220 340" stroke="rgba(34,211,238,.14)" fill="none" />
                <path d="M820 380 C945 500 1030 560 1110 610" stroke="rgba(34,211,238,.14)" fill="none" />
                <path d="M820 380 C690 500 620 560 540 620" stroke="rgba(34,211,238,.14)" fill="none" />
            </svg>

            <DeepSpaceNetworkCore title={locale.coreTitle} status={locale.coreStatus} subtitle={locale.coreSubtitle} />

            {DEEP_SPACE_SIGNALS.map((signal, index) => (
                <DeepSpaceSignalNode key={signal.id} signal={signal} locale={locale} index={index} />
            ))}
        </div>
    );
};