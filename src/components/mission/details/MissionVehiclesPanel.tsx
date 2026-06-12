import Link from "next/link";
import {ExternalLink, Satellite} from "lucide-react";

import {useLanguage} from "@/src/context";
import type {MissionNamedEntity} from "@/src/types/missions";

type Props = {
    spacecraft: MissionNamedEntity[];
    launchVehicles: MissionNamedEntity[];
    operators: MissionNamedEntity[];
};

const getWikipediaSearchUrl = (value: string) => {
    return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(value)}`;
};

export const MissionVehiclesPanel = ({
                                         spacecraft,
                                         launchVehicles,
                                         operators,
                                     }: Props) => {
    const {locale} = useLanguage();
    const t = locale.missions.missionDetails;

    const items = [
        ...operators.map((item) => ({...item, type: t.operator})),
        ...spacecraft.map((item) => ({...item, type: t.spacecraft})),
        ...launchVehicles.map((item) => ({...item, type: t.launchVehicle})),
    ];

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)]">
                    <Satellite className="h-5 w-5 text-[var(--color-accent)]" />
                </div>

                <h2 className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
                    {t.vehicles}
                </h2>
            </div>

            {items.length ? (
                <div className="mt-5 grid gap-3">
                    {items.map((item) => (
                        <Link
                            key={`${item.type}-${item.id}`}
                            href={getWikipediaSearchUrl(item.label)}
                            target="_blank"
                            className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]"
                        >
                            <p className="font-black text-[var(--color-text)]">
                                {item.label}
                            </p>

                            <p className="mt-1 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)]">
                                {item.type}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="mt-5 text-sm text-[var(--color-text-muted)]">
                    {t.vehiclesMissing}
                </p>
            )}
        </section>
    );
};