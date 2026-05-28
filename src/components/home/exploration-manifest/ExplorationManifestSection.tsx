"use client";

import {useLanguage} from "@/src/context/LanguageContext";
import type {ExplorationManifestLocale} from "@/src/types/explorationManifest";

import {ExplorationManifestBackground} from "./ExplorationManifestBackground";
import {ExplorationManifestGrid} from "./ExplorationManifestGrid";
import {ExplorationManifestHeader} from "./ExplorationManifestHeader";
import {ExplorationManifestQuote} from "./ExplorationManifestQuote";

export const ExplorationManifestSection = () => {
    const {locale} = useLanguage();

    const t = locale.explorationManifest as ExplorationManifestLocale;

    return (
        <section className="relative isolate overflow-hidden bg-[#020611] px-4 py-14 text-white sm:px-6 lg:px-10">
            <div className="relative mx-auto min-h-[780px] max-w-[1680px] overflow-hidden rounded-[2.8rem] border border-white/10 px-5 py-20 sm:px-8 lg:px-12">
                <ExplorationManifestBackground />

                <div className="relative z-10">
                    <ExplorationManifestHeader locale={t} />
                    <ExplorationManifestGrid locale={t} />
                    <ExplorationManifestQuote locale={t} />
                </div>
            </div>
        </section>
    );
};