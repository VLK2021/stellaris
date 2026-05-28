"use client";

import {DEEP_SPACE_SIGNALS} from "@/src/constants/deepSpaceNetwork.constants";
import type {DeepSpaceNetworkLocale} from "@/src/types/deepSpaceNetwork";

import {DeepSpaceNetworkCore} from "./DeepSpaceNetworkCore";
import {DeepSpaceSignalNode} from "./DeepSpaceSignalNode";

type Props = {
    locale: DeepSpaceNetworkLocale;
};

export const DeepSpaceNetworkMap = ({locale}: Props) => {
    return (
        <div className="relative min-h-[660px] lg:min-h-[760px]">
            <svg
                className="pointer-events-none absolute inset-0 hidden h-full w-full opacity-80 lg:block"
                viewBox="0 0 1400 760"
                preserveAspectRatio="none"
            >
                <ellipse cx="710" cy="390" rx="420" ry="230" stroke="rgba(34,211,238,.18)" fill="none" />
                <ellipse cx="710" cy="390" rx="510" ry="290" stroke="rgba(59,130,246,.14)" fill="none" />
                <ellipse cx="710" cy="390" rx="610" ry="345" stroke="rgba(168,85,247,.10)" fill="none" />
            </svg>

            <DeepSpaceNetworkCore
                title={locale.coreTitle}
                status={locale.coreStatus}
                subtitle={locale.coreSubtitle}
            />

            {DEEP_SPACE_SIGNALS.map((signal, index) => (
                <DeepSpaceSignalNode
                    key={signal.id}
                    signal={signal}
                    locale={locale}
                    index={index}
                />
            ))}
        </div>
    );
};