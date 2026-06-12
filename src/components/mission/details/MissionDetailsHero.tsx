import Image from "next/image";

import {useLanguage} from "@/src/context";
import type {MissionAggregated} from "@/src/types/missions";

type Props = {
    mission: MissionAggregated;
};

export const MissionDetailsHero = ({mission}: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions.missionDetails;

    const heroImage =
        mission.thumbnail ??
        mission.media.images[0]?.preview ??
        null;

    return (
        <section className="relative overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--color-accent-soft),transparent_34%)]" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_430px]">
                <div className="relative min-h-[460px] bg-[var(--color-card-deep)]">
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

                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card-deep)] via-[var(--color-glass)] to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                            {t.badge}
                        </p>

                        <h1 className="mt-3 max-w-4xl bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-4xl font-black uppercase leading-[0.92] tracking-[-0.075em] text-transparent md:text-6xl">
                            {mission.title}
                        </h1>
                    </div>
                </div>

                <aside className="p-6 md:p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                        {t.overview}
                    </p>

                    <p className="mt-5 text-base leading-8 text-[var(--color-text-muted)]">
                        {mission.extract || mission.description || t.unknown}
                    </p>
                </aside>
            </div>
        </section>
    );
};