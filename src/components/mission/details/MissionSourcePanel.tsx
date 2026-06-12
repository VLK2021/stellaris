import Link from "next/link";
import {ExternalLink, ShieldCheck} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionAggregated} from "@/src/types/missions";

type Props = {
    mission: MissionAggregated;
};

export const MissionSourcePanel = ({mission}: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions.missionDetails;

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)]">
                    <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" />
                </div>

                <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                    {t.sources}
                </h2>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                {mission.wikipediaUrl && (
                    <LinkButton
                        href={mission.wikipediaUrl}
                        label="Wikipedia"
                    />
                )}

                {mission.wikidataId && (
                    <LinkButton
                        href={`https://www.wikidata.org/wiki/${mission.wikidataId}`}
                        label="Wikidata"
                    />
                )}
            </div>
        </section>
    );
};

const LinkButton = ({
                        href,
                        label,
                    }: {
    href: string;
    label: string;
}) => (
    <Link
        href={href}
        target="_blank"
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
    >
        {label}
        <ExternalLink className="h-3.5 w-3.5" />
    </Link>
);