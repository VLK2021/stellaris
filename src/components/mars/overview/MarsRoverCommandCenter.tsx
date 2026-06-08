import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

import {MarsRoverCard} from "./MarsRoverCard";

type Props = {
    rovers: MarsRoverSummary[];
    t: MarsLocale;
};

export const MarsRoverCommandCenter = ({rovers, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-orange-200/12 bg-white/[0.035] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(249,115,22,.18),transparent_34%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                    {t.roverCommandTitle}
                </p>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
                    {t.roverCommandDescription}
                </p>

                <div className="mt-6 grid gap-4 xl:grid-cols-4">
                    {rovers.map((rover, index) => (
                        <MarsRoverCard key={rover.name} rover={rover} index={index} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
};