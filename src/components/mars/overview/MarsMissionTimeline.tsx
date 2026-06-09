import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

type Props = {
    rovers: MarsRoverSummary[];
    t: MarsLocale;
};

export const MarsMissionTimeline = ({rovers, t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-6 shadow-[var(--mars-glow)]">
            <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-[var(--mars-accent)]/40 to-transparent" />

            <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                    {t.timelineTitle}
                </p>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--mars-muted)]">
                    {t.timelineDescription}
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-4">
                    {rovers
                        .slice()
                        .sort((a, b) => a.landingDate.localeCompare(b.landingDate))
                        .map((rover) => (
                            <article
                                key={rover.name}
                                className="relative rounded-[1.5rem] border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] p-4 transition hover:border-[var(--mars-accent)] hover:shadow-[var(--mars-glow)]"
                            >
                                <span className="absolute -top-2 left-5 h-4 w-4 rounded-full border border-[var(--mars-accent)] bg-[var(--mars-accent)] shadow-[0_0_24px_rgba(249,115,22,.75)]" />

                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--mars-accent)]">
                                    {rover.landingDate}
                                </p>

                                <h3 className="mt-3 text-xl font-black uppercase tracking-[-0.04em] text-[var(--mars-text)]">
                                    {rover.label}
                                </h3>

                                <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--mars-muted)]">
                                    {rover.status === "active" ? t.active : t.complete}
                                </p>
                            </article>
                        ))}
                </div>
            </div>
        </section>
    );
};