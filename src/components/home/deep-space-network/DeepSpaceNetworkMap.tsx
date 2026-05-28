"use client";

import {motion} from "framer-motion";

import {DEEP_SPACE_SIGNALS} from "@/src/constants/deepSpaceNetwork.constants";
import type {
    DeepSpaceNetworkLocale,
    DeepSpaceSignalTelemetry,
} from "@/src/types/deepSpaceNetwork";

import {getTelemetryById} from "@/src/helpers/deepSpaceNetwork.helpers";

import {DeepSpaceNetworkCore} from "./DeepSpaceNetworkCore";
import {DeepSpaceSignalNode} from "./DeepSpaceSignalNode";

type Props = {
    locale: DeepSpaceNetworkLocale;
    telemetry: DeepSpaceSignalTelemetry[] | null;
};

export const DeepSpaceNetworkMap = ({locale, telemetry}: Props) => {
    const onlineCount =
        telemetry?.filter((item) => item.status === "online").length ?? 0;

    return (
        <div className="absolute inset-0 hidden lg:block">
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
                viewBox="0 0 1400 760"
                preserveAspectRatio="none"
            >
                <ellipse cx="820" cy="380" rx="335" ry="180" stroke="rgba(34,211,238,.24)" fill="none" />
                <ellipse cx="820" cy="380" rx="430" ry="245" stroke="rgba(59,130,246,.17)" fill="none" />
                <ellipse cx="820" cy="380" rx="535" ry="315" stroke="rgba(168,85,247,.12)" fill="none" />

                <motion.ellipse
                    cx="820"
                    cy="380"
                    rx="382"
                    ry="215"
                    stroke="rgba(34,211,238,.58)"
                    strokeWidth="1.4"
                    fill="none"
                    strokeDasharray="90 820"
                    animate={{strokeDashoffset: [0, -910]}}
                    transition={{duration: 8, repeat: Infinity, ease: "linear"}}
                />

                <motion.ellipse
                    cx="820"
                    cy="380"
                    rx="500"
                    ry="292"
                    stroke="rgba(96,165,250,.42)"
                    strokeWidth="1.2"
                    fill="none"
                    strokeDasharray="80 900"
                    animate={{strokeDashoffset: [0, 980]}}
                    transition={{duration: 11, repeat: Infinity, ease: "linear"}}
                />
            </svg>

            <DeepSpaceNetworkCore
                title={locale.coreTitle}
                status={`${onlineCount}/${DEEP_SPACE_SIGNALS.length} ${locale.coreStatus}`}
                subtitle={locale.coreSubtitle}
            />

            {DEEP_SPACE_SIGNALS.map((signal, index) => (
                <DeepSpaceSignalNode
                    key={signal.id}
                    signal={signal}
                    locale={locale}
                    telemetry={getTelemetryById(telemetry, signal.id)}
                    index={index}
                />
            ))}
        </div>
    );
};