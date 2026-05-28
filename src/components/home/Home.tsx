"use client";

import type {NasaAsset} from "@/src/types/nasa";

import {HeroSection} from "./HeroSection";
import {ModuleOrbitRail} from "./ModuleOrbitRail";
import {TrustCards} from "./TrustCards";
import {LiveCommandSection} from "@/src/components/home/live-command";
import {MissionTimelineSection} from "@/src/components/home/mission-timeline";
import {DeepSpaceNetworkSection} from "@/src/components/home/deep-space-network/DeepSpaceNetworkSection";

type HomeProps = {
    assets: NasaAsset[];
};

export const Home = ({assets}: HomeProps) => {
    return (
        <div className="relative">
            <HeroSection assets={assets} />
            <ModuleOrbitRail assets={assets} />
            <TrustCards assets={assets} />
            <LiveCommandSection />
            <MissionTimelineSection />
            <DeepSpaceNetworkSection />
        </div>
    );
};