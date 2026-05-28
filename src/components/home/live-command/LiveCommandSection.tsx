"use client";

import {AnimatePresence} from "framer-motion";

import {useLanguage} from "@/src/context";
import {useNasaLiveData} from "@/src/hooks/useNasaLiveData";

import {LiveSpaceBackdrop} from "./LiveSpaceBackdrop";
import {LiveCommandHeader} from "./LiveCommandHeader";
import {LiveHeroPanel} from "./LiveHeroPanel";
import {LiveTelemetryDeck} from "./LiveTelemetryDeck";
import {LiveMediaDock} from "./LiveMediaDock";
import {LiveOrbitShowcase} from "./LiveOrbitShowcase";
import {LiveCommandLoader} from "./LiveCommandLoader";
import {NasaDataArchitectureSection} from "@/src/components/home/nasa-architecture";
import {NasaArchitectureLocale} from "@/src/types";

export const LiveCommandSection = () => {
    const {locale} = useLanguage();
    const {data, isLoading, error} = useNasaLiveData();

    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-[#020611] px-4 py-8 text-white sm:px-6 lg:px-10">
            <LiveSpaceBackdrop imageUrl={data?.apod?.imageUrl ?? data?.epic?.imageUrl} />

            <AnimatePresence>
                {isLoading && (
                    <LiveCommandLoader text={locale.liveData.status.syncing} />
                )}
            </AnimatePresence>

            <div className="relative z-10 mx-auto max-w-[1680px]">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
                    <LiveCommandHeader
                        locale={locale.liveData}
                        isLoading={isLoading}
                        error={error}
                        updatedAt={data?.updatedAt}
                    />

                    <LiveOrbitShowcase />
                </div>

                <div className="mt-7 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
                    <LiveHeroPanel
                        locale={locale.liveData}
                        apod={data?.apod ?? null}
                        epic={data?.epic ?? null}
                    />

                    <LiveTelemetryDeck
                        locale={locale.liveData}
                        neo={data?.neo ?? null}
                        donki={data?.donki ?? null}
                        iss={data?.iss ?? null}
                    />
                </div>

                <LiveMediaDock
                    locale={locale.liveData}
                    epic={data?.epic ?? null}
                    marsMedia={data?.marsMedia ?? null}
                    donki={data?.donki ?? null}
                />
            </div>

            <NasaDataArchitectureSection
                locale={locale.nasaArchitecture as NasaArchitectureLocale}
            />
        </section>
    );
};