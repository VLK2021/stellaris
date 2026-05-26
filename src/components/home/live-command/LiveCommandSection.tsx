"use client";

import {useLanguage} from "@/src/context";
import {useNasaLiveData} from "@/src/hooks/useNasaLiveData";

import {LiveSpaceBackdrop} from "./LiveSpaceBackdrop";
import {LiveCommandHeader} from "./LiveCommandHeader";
import {LiveHeroPanel} from "./LiveHeroPanel";
import {LiveTelemetryDeck} from "./LiveTelemetryDeck";
import {LiveMediaDock} from "./LiveMediaDock";
import {LiveOrbitShowcase} from "./LiveOrbitShowcase";

export const LiveCommandSection = () => {
    const {locale} = useLanguage();
    const {data, isLoading, error} = useNasaLiveData();

    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-[#020611] px-4 py-14 text-white sm:px-6 lg:px-10">
            <LiveSpaceBackdrop imageUrl={data?.apod?.imageUrl ?? data?.epic?.imageUrl} />

            {isLoading && (
                <div className="absolute inset-0 z-30 grid place-items-center bg-[#020611]/75 backdrop-blur-xl">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-300">
                            {locale.liveData.status.syncing}
                        </p>
                    </div>
                </div>
            )}

            <div className="relative z-10 mx-auto max-w-[1680px]">
                <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-center">
                    <LiveCommandHeader
                        locale={locale.liveData}
                        isLoading={isLoading}
                        error={error}
                        updatedAt={data?.updatedAt}
                    />

                    <LiveOrbitShowcase />
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.85fr]">
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
        </section>
    );
};