"use client";

import {useNasaLiveData} from "@/src/hooks/useNasaLiveData";

import {LiveSpaceBackdrop} from "./LiveSpaceBackdrop";
import {LiveCommandHeader} from "./LiveCommandHeader";
import {LiveHeroPanel} from "./LiveHeroPanel";
import {LiveTelemetryDeck} from "./LiveTelemetryDeck";
import {LiveMediaDock} from "./LiveMediaDock";

export const LiveCommandSection = () => {
    const {data, isLoading, error} = useNasaLiveData();

    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-[#020611] px-4 py-20 text-white sm:px-6 lg:px-10">
            <LiveSpaceBackdrop imageUrl={data?.apod?.imageUrl} />

            <div className="relative z-10 mx-auto max-w-[1800px]">
                <LiveCommandHeader
                    isLoading={isLoading}
                    error={error}
                    updatedAt={data?.updatedAt}
                />

                <div className="grid min-h-[720px] gap-6 lg:grid-cols-[1.35fr_0.9fr]">
                    <LiveHeroPanel
                        apod={data?.apod ?? null}
                        epic={data?.epic ?? null}
                    />

                    <LiveTelemetryDeck
                        neo={data?.neo ?? null}
                        donki={data?.donki ?? null}
                        iss={data?.iss ?? null}
                    />
                </div>

                <LiveMediaDock
                    epic={data?.epic ?? null}
                    marsMedia={data?.marsMedia ?? null}
                    iss={data?.iss ?? null}
                />
            </div>
        </section>
    );
};