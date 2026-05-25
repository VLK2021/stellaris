"use client";

import {HeroSection} from "./HeroSection";
import {MissionStats} from "./MissionStats";
import {ModuleOrbitRail} from "./ModuleOrbitRail";
import {TrustCards} from "./TrustCards";

export const Home = () => {
    return (
        <div className="relative">
            <HeroSection />
            <MissionStats />
            <ModuleOrbitRail />
            <TrustCards />
        </div>
    );
};