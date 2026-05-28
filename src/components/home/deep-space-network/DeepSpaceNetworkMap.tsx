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
        <div className="relative min-h-[620px] lg:min-h-[700px]">
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-90 lg:block" viewBox="0 0 1200 700" preserveAspectRatio="none">
                <ellipse cx="590" cy="350" rx="310" ry="170" stroke="rgba(34,211,238,.24)" fill="none" />
                <ellipse cx="590" cy="350" rx="390" ry="225" stroke="rgba(59,130,246,.18)" fill="none" />
                <ellipse cx="590" cy="350" rx="480" ry="285" stroke="rgba(168,85,247,.13)" fill="none" />

                <motion.ellipse cx="590" cy="350" rx="350" ry="200" stroke="rgba(34,211,238,.55)" strokeWidth="1.5" fill="none" strokeDasharray="90 800" animate={{strokeDashoffset: [0, -890]}} transition={{duration: 8, repeat: Infinity, ease: "linear"}} />
                <motion.ellipse cx="590" cy="350" rx="455" ry="265" stroke="rgba(96,165,250,.42)" strokeWidth="1.2" fill="none" strokeDasharray="80 900" animate={{strokeDashoffset: [0, 980]}} transition={{duration: 11, repeat: Infinity, ease: "linear"}} />

                <path d="M590 350 C410 270 320 190 250 140" stroke="rgba(34,211,238,.2)" fill="none" />
                <path d="M590 350 C735 270 825 215 910 170" stroke="rgba(34,211,238,.2)" fill="none" />
                <path d="M590 350 C405 355 300 360 220 335" stroke="rgba(34,211,238,.14)" fill="none" />
                <path d="M590 350 C790 350 900 360 1010 340" stroke="rgba(34,211,238,.14)" fill="none" />
                <path d="M590 350 C720 470 820 535 900 565" stroke="rgba(34,211,238,.14)" fill="none" />
                <path d="M590 350 C460 470 375 540 300 590" stroke="rgba(34,211,238,.14)" fill="none" />
            </svg>

            <DeepSpaceNetworkCore title={locale.coreTitle} status={locale.coreStatus} subtitle={locale.coreSubtitle} />

            {DEEP_SPACE_SIGNALS.map((signal, index) => (
                <DeepSpaceSignalNode key={signal.id} signal={signal} locale={locale} index={index} />
            ))}
        </div>
    );
};