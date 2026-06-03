"use client";

import {Atom, Database, Orbit, Radar, Sparkles, Telescope} from "lucide-react";

import {ExoplanetsControlNode} from "./ExoplanetsControlNode";
import {ExoplanetsOrbitField} from "./ExoplanetsOrbitField";

const nodes = [
    {href: "/exoplanets/catalog", title: "Каталог екзопланет", text: "Планети, параметри, орбіти, температура, маса, радіус.", icon: Database, position: "xl:left-[4%] xl:top-[12%]"},
    {href: "/exoplanets/systems", title: "Зоряні системи", text: "Системи, хост-зірки, кількість планет, відстані.", icon: Orbit, position: "xl:right-[4%] xl:top-[12%]"},
    {href: "/exoplanets/stars", title: "Зірки-хости", text: "Зорі, навколо яких обертаються екзопланети.", icon: Sparkles, position: "xl:left-[4%] xl:bottom-[12%]"},
    {href: "/exoplanets/methods", title: "Методи відкриття", text: "Transit, Radial Velocity, Imaging, Microlensing.", icon: Radar, position: "xl:right-[4%] xl:bottom-[12%]"},
    {href: "/exoplanets/atmospheres", title: "Атмосфери", text: "Спектроскопія атмосфер і спостереження планет.", icon: Atom, position: "xl:left-1/2 xl:top-[6%] xl:-translate-x-1/2"},
    {href: "/exoplanets/archive", title: "NASA Archive", text: "TAP-таблиці, datasets і структура Exoplanet Archive.", icon: Telescope, position: "xl:left-1/2 xl:bottom-[6%] xl:-translate-x-1/2"},
];

export const ExoplanetsCommandCenter = () => {
    return (
        <section className="relative min-h-[720px] overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-6">
            <ExoplanetsOrbitField />

            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(var(--star-color)_1px,transparent_1px)] [background-size:36px_36px]" />

            <div className="relative z-20 mx-auto flex min-h-[680px] max-w-[1380px] items-center justify-center">
                <div className="absolute left-1/2 top-1/2 z-10 w-[240px] -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="exo-label text-[10px] font-black uppercase tracking-[0.24em]">
                        Exoplanet Portal
                    </p>

                    <h2 className="mt-2 text-2xl font-black uppercase tracking-[-0.06em]">
                        Command Center
                    </h2>

                    <p className="exo-muted mt-3 text-xs leading-6">
                        Обери напрям дослідження NASA Exoplanet Archive.
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
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};