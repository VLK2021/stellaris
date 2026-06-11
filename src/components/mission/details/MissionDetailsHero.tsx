import Image from "next/image";

import type {MissionAggregated} from "@/src/types/missions";

type Props = {
    mission: MissionAggregated;
};

export const MissionDetailsHero = ({mission}: Props) => {
    const heroImage =
        mission.thumbnail ??
        mission.media.images[0]?.preview ??
        null;

    return (
        <section className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,.16),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(139,92,246,.14),transparent_34%)]" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_430px]">
                <div className="relative min-h-[460px] bg-black/40">
                    {heroImage && (
                        <Image
                            src={heroImage}
                            alt={mission.title}
                            fill
                            sizes="70vw"
                            className="object-cover"
                            unoptimized
                            priority
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                            Mission details
                        </p>

                        <h1 className="mt-3 max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.08em] md:text-7xl">
                            {mission.title}
                        </h1>
                    </div>
                </div>

                <aside className="p-6 md:p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                        Overview
                    </p>

                    <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">
                        {mission.extract || mission.description}
                    </p>
                </aside>
            </div>
        </section>
    );
};