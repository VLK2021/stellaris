import Link from "next/link";
import {ExternalLink, Users} from "lucide-react";

import type {MissionAggregatedCrewMember} from "@/src/types/missions";

type Props = {
    crew: MissionAggregatedCrewMember[];
};

export const MissionCrewPanel = ({crew}: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <Header />

            {crew.length ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {crew.map((member) => (
                        <Link
                            key={member.id}
                            href={`https://www.wikidata.org/wiki/${member.id}`}
                            target="_blank"
                            className="group rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)]"
                        >
                            <p className="text-base font-black">
                                {member.name}
                            </p>

                            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                                {member.role ?? "Crew member"}
                            </p>

                            <p className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
                                Wikidata profile
                                <ExternalLink className="h-3.5 w-3.5" />
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="mt-5 text-sm text-[var(--color-text-muted)]">
                    Дані екіпажу не знайдені у Wikidata.
                </p>
            )}
        </section>
    );
};

const Header = () => (
    <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)]">
            <Users className="h-5 w-5 text-[var(--color-accent)]" />
        </div>

        <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
            Екіпаж
        </h2>
    </div>
);