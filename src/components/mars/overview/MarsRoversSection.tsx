import {CalendarDays, Camera, Rocket} from "lucide-react";

import type {MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rovers: MarsRoverSummary[];
};

export const MarsRoversSection = ({rovers}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.2rem] border border-orange-200/12 bg-white/[0.035] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(249,115,22,.16),transparent_34%)]" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                    Rover Command Center
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] text-white">
                    Марсіанські ровери
                </h2>

                <div className="mt-6 grid gap-4 lg:grid-cols-4">
                    {rovers.map((rover) => (
                        <article
                            key={rover.name}
                            className="rounded-[1.6rem] border border-orange-200/12 bg-black/25 p-4 transition hover:border-orange-300/50 hover:shadow-[0_0_40px_rgba(249,115,22,.18)]"
                        >
                            <Rocket className="h-5 w-5 text-orange-300" />

                            <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.04em]">
                                {rover.label}
                            </h3>

                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                                {rover.status}
                            </p>

                            <div className="mt-5 grid gap-2">
                                <Line icon={CalendarDays} label="Landing" value={rover.landingDate} />
                                <Line icon={CalendarDays} label="Max date" value={rover.maxDate} />
                                <Line icon={Camera} label="Cameras" value={rover.cameras.length} />
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Line = ({
                  icon: Icon,
                  label,
                  value,
              }: {
    icon: typeof CalendarDays;
    label: string;
    value: string | number;
}) => (
    <div className="rounded-xl border border-white/8 bg-white/[0.035] p-3">
        <Icon className="h-4 w-4 text-orange-300" />
        <p className="mt-2 text-[8px] font-black uppercase tracking-[0.16em] text-white/40">
            {label}
        </p>
        <p className="mt-1 truncate text-xs font-black text-white">{value}</p>
    </div>
);