import Link from "next/link";
import {ExternalLink, Users} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionAggregatedCrewMember} from "@/src/types/missions";

type Props = {
    crew: MissionAggregatedCrewMember[];
};

const getWikipediaSearchUrl = (value: string) => {
    return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(value)}`;
};

export const MissionCrewPanel = ({crew}: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions.missionDetails;

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)]">
                    <Users className="h-5 w-5 text-[var(--color-accent)]" />
                </div>

                <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                    {t.crew}
                </h2>
            </div>

            {crew.length ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {crew.map((member) => (
                        <Link
                            key={member.id}
                            href={getWikipediaSearchUrl(member.name)}
                            target="_blank"
                            className="group rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                        >
                            <p className="text-base font-black text-[var(--color-text)]">
                                {member.name}
                            </p>

                            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                                {member.role ?? t.crewMember}
                            </p>

                            <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
                                {t.openWikipedia}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="mt-5 text-sm text-[var(--color-text-muted)]">
                    {t.crewMissing}
                </p>
            )}
        </section>
    );
};