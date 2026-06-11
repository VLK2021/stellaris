import {Radar, Rocket, Satellite, Telescope} from "lucide-react";

type Props = {
    stats: {
        total: number;
        crewed: number;
        robotic: number;
        telescope: number;
        station: number;
    };
};

export const MissionControlHero = ({stats}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,.16),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(139,92,246,.14),transparent_34%)]" />

            <div className="relative z-10 grid gap-8 xl:grid-cols-[1fr_520px]">
                <div>
                    <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        <Radar className="h-4 w-4" />
                        Mission Control Archive
                    </p>

                    <h1 className="mt-6 max-w-5xl text-5xl font-black uppercase leading-[0.86] tracking-[-0.08em] md:text-7xl">
                        Space missions, decoded from live sources.
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--color-text-muted)] md:text-lg">
                        Aggregated mission intelligence from Wikipedia, Wikidata and NASA media archive.
                        Each mission is normalized through one internal catalog before being displayed.
                    </p>
                </div>

                <div className="relative min-h-[360px] rounded-[2rem] border border-[var(--color-border)] bg-black/20 p-5 backdrop-blur-xl">
                    <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border)]" />
                    <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-border-strong)]" />
                    <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent)]/20 shadow-[var(--shadow-glow)]" />

                    <Stat icon={Rocket} label="Total missions" value={stats.total} className="left-5 top-5" />
                    <Stat icon={Satellite} label="Robotic" value={stats.robotic} className="right-5 top-16" />
                    <Stat icon={Telescope} label="Crewed" value={stats.crewed} className="bottom-5 left-8" />
                </div>
            </div>
        </section>
    );
};

const Stat = ({
                  icon: Icon,
                  label,
                  value,
                  className,
              }: {
    icon: typeof Rocket;
    label: string;
    value: number;
    className: string;
}) => (
    <div className={`absolute rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl ${className}`}>
        <Icon className="h-5 w-5 text-[var(--color-accent)]" />
        <p className="mt-3 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
            {label}
        </p>
        <p className="mt-1 text-3xl font-black text-[var(--color-text)]">
            {value}
        </p>
    </div>
);