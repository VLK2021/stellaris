import Link from "next/link";
import {ExternalLink, ShieldCheck} from "lucide-react";

import type {MissionAggregated} from "@/src/types/missions";

type Props = {
    mission: MissionAggregated;
};

export const MissionSourcePanel = ({mission}: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)]">
                    <ShieldCheck className="h-5 w-5 text-[var(--color-accent)]" />
                </div>

                <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                    Джерела
                </h2>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                {mission.wikipediaUrl && (
                    <LinkButton href={mission.wikipediaUrl} label="Wikipedia" />
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
        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
    >
        {label}
        <ExternalLink className="h-3.5 w-3.5" />
    </Link>
);