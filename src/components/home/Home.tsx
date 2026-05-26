"use client";

import type {NasaAsset} from "@/src/types/nasa";

import {HeroSection} from "./HeroSection";
import {ModuleOrbitRail} from "./ModuleOrbitRail";
import {TrustCards} from "./TrustCards";
import {LiveCommandSection} from "@/src/components/home/live-command";

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
        </div>
    );
};