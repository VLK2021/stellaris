"use client";

import {HeroSection} from "./HeroSection";
import {MissionStats} from "./MissionStats";

export const Home = () => {
    return (
        <div className="relative">
            <HeroSection />
            <MissionStats />
        </div>
    );
};