"use client";

import type {NasaAsset} from "@/src/types/nasa";

import {HeroSection} from "./HeroSection";
import {GlobalLandingBackground} from "./GlobalLandingBackground";
import {ModuleOrbitRail} from "./ModuleOrbitRail";
import {TrustCards} from "./TrustCards";

type HomeProps = {
    assets: NasaAsset[];
};

export const Home = ({assets}: HomeProps) => {
    return (
        <div className="relative">
            <HeroSection assets={assets} />

            <GlobalLandingBackground assets={assets}>
                <ModuleOrbitRail assets={assets} />
                <TrustCards assets={assets} />
            </GlobalLandingBackground>
        </div>
    );
};