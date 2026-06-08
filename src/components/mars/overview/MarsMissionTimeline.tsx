import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rovers: MarsRoverSummary[];
    t: MarsLocale;
};

export const MarsMissionTimeline = ({rovers, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-orange-200/12 bg-white/[0.035] p-6">
            <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-orange-300/40 to-transparent" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
                    {t.timelineTitle}
                </p>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/55">
                    {t.timelineDescription}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-4">
                    {rovers
                        .slice()
                        .sort((a, b) => a.landingDate.localeCompare(b.landingDate))
                        .map((rover) => (
                            <article key={rover.name} className="relative rounded-[1.5rem] border border-white/10 bg-black/35 p-4">
                                <span className="absolute -top-2 left-5 h-4 w-4 rounded-full border border-orange-300 bg-orange-500 shadow-[0_0_25px_rgba(249,115,22,.8)]" />
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">{rover.landingDate}</p>
                                <h3 className="mt-3 text-xl font-black uppercase tracking-[-0.04em]">{rover.label}</h3>
                                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">{rover.status}</p>
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
};