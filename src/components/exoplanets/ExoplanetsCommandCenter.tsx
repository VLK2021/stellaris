"use client";

import {useMemo} from "react";
import {Atom, Database, Orbit, Radar, Telescope} from "lucide-react";

import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetsControlNode} from "./ExoplanetsControlNode";
import {ExoplanetsOrbitField} from "./ExoplanetsOrbitField";

type Props = {
    t: ExoplanetsLocale;
};

export const ExoplanetsCommandCenter = ({t}: Props) => {
    const nodes = useMemo(
        () => [
            {
                href: "/exoplanets/catalog",
                title: t.portal.catalog.title,
                text: t.portal.catalog.description,
                icon: Database,
                position: "xl:left-[4%] xl:top-[10%]",
            },
            {
                href: "/exoplanets/atmospheres",
                title: t.portal.atmospheres.title,
                text: t.portal.atmospheres.description,
                icon: Atom,
                position: "xl:right-[4%] xl:top-[10%]",
            },
            {
                href: "/exoplanets/methods",
                title: t.portal.methods.title,
                text: t.portal.methods.description,
                icon: Radar,
                position: "xl:left-[4%] xl:bottom-[10%]",
            },
            {
                href: "/exoplanets/habitable",
                title: t.portal.habitable.title,
                text: t.portal.habitable.description,
                icon: Telescope,
                position: "xl:right-[4%] xl:bottom-[10%]",
            },
            {
                href: "/exoplanets/systems",
                title: t.portal.systems.title,
                text: t.portal.systems.description,
                icon: Orbit,
                position: "xl:left-1/2 xl:bottom-[4%] xl:-translate-x-1/2",
            },
        ],
        [t],
    );

    return (
        <section className="relative min-h-[720px] overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] sm:p-6">
            <ExoplanetsOrbitField />

            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:36px_36px]" />

            <div className="relative z-20 mx-auto flex min-h-[680px] max-w-[1380px] items-center justify-center">
                <div className="pointer-events-none absolute left-1/2 top-[46%] z-10 w-[270px] -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="exo-label text-[10px] font-black uppercase tracking-[0.24em]">
                        {t.portal.eyebrow}
                    </p>

                    <h2 className="mt-3 text-2xl font-black uppercase tracking-[-0.06em]">
                        {t.portal.title}
                    </h2>

                    <p className="exo-muted mt-3 text-xs leading-6">
                        {t.portal.description}
                    </p>

                    <div className="mx-auto mt-5 h-1.5 w-24 overflow-hidden rounded-full bg-[var(--color-glass)]">
                        <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--color-accent)]" />
                    </div>
                </div>

                <div className="grid w-full gap-4 pt-[360px] xl:block xl:pt-0">
                    {nodes.map((node, index) => (
                        <ExoplanetsControlNode
                            key={node.href}
                            node={node}
                            index={index}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};