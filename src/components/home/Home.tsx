"use client";

import type {NasaAsset} from "@/src/types/nasa";

import {HeroSection} from "./HeroSection";
import {MissionStats} from "./MissionStats";
import {ModuleOrbitRail} from "./ModuleOrbitRail";
import {TrustCards} from "./TrustCards";

type HomeProps = {
    assets: NasaAsset[];
};

export const Home = ({assets}: HomeProps) => {
    return (
        <div className="relative">
            <HeroSection assets={assets} />
            <MissionStats />
            <ModuleOrbitRail />
            <TrustCards />
        </div>
    );
};