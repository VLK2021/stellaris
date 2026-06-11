import Link from "next/link";
import {ExternalLink, Satellite} from "lucide-react";

import type {MissionNamedEntity} from "@/src/types/missions";

type Props = {
    spacecraft: MissionNamedEntity[];
    launchVehicles: MissionNamedEntity[];
    operators: MissionNamedEntity[];
};

export const MissionVehiclesPanel = ({
                                         spacecraft,
                                         launchVehicles,
                                         operators,
                                     }: Props) => {
    const items = [
        ...operators.map((item) => ({...item, type: "Operator"})),
        ...spacecraft.map((item) => ({...item, type: "Spacecraft"})),
        ...launchVehicles.map((item) => ({...item, type: "Launch vehicle"})),
    ];

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)]">
                    <Satellite className="h-5 w-5 text-[var(--color-accent)]" />
                </div>

                <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                    Техніка й оператори
                </h2>
            </div>

            {items.length ? (
                <div className="mt-5 grid gap-3">
                    {items.map((item) => (
                        <Link
                            key={`${item.type}-${item.id}`}
                            href={`https://www.wikidata.org/wiki/${item.id}`}
                            target="_blank"
                            className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)]"
                        >
                            <p className="font-black">{item.label}</p>
                            <p className="mt-1 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
                                {item.type}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="mt-5 text-sm text-[var(--color-text-muted)]">
                    Дані про техніку не знайдені.
                </p>
            )}
        </section>
    );
};