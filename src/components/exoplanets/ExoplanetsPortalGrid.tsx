"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {Atom, Database, Orbit, Radar, Sparkles, Telescope} from "lucide-react";

const cards = [
    {
        href: "/exoplanets/catalog",
        title: "Каталог екзопланет",
        description: "Підтверджені планети, маса, радіус, температура, орбіта, метод відкриття.",
        icon: Database,
    },
    {
        href: "/exoplanets/systems",
        title: "Зоряні системи",
        description: "Планетні системи, кількість планет, хост-зірки та відстані.",
        icon: Orbit,
    },
    {
        href: "/exoplanets/stars",
        title: "Зірки-хости",
        description: "Зорі, навколо яких обертаються підтверджені екзопланети.",
        icon: Sparkles,
    },
    {
        href: "/exoplanets/methods",
        title: "Методи відкриття",
        description: "Transit, Radial Velocity, Imaging, Microlensing та інші методи.",
        icon: Radar,
    },
    {
        href: "/exoplanets/atmospheres",
        title: "Атмосфери",
        description: "Спектроскопія атмосфер і дані про спостереження планет.",
        icon: Atom,
    },
    {
        href: "/exoplanets/archive",
        title: "NASA Archive",
        description: "Огляд таблиць NASA Exoplanet Archive TAP та доступних наборів даних.",
        icon: Telescope,
    },
];

export const ExoplanetsPortalGrid = () => {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="absolute inset-0 opacity-25" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10">
                <div className="mb-5">
                    <p className="exo-label text-[11px] font-black uppercase tracking-[0.22em]">
                        Exoplanet Portal
                    </p>

                    <h2 className="mt-2 text-3xl font-black uppercase tracking-[-0.06em]">
                        Обери розділ для дослідження
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <motion.div
                                key={card.href}
                                initial={{opacity: 0, y: 18}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, amount: 0.2}}
                                transition={{duration: 0.35, delay: index * 0.04}}
                            >
                                <Link
                                    href={card.href}
                                    className="group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-[1.4rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                                >
                                    <div className="absolute inset-0 opacity-0 transition group-hover:opacity-40" style={{background: "var(--hero-bg)"}} />

                                    <div className="relative z-10">
                                        <Icon className="h-6 w-6 text-[var(--color-accent)]" />

                                        <h3 className="mt-5 text-2xl font-black uppercase tracking-[-0.04em]">
                                            {card.title}
                                        </h3>

                                        <p className="exo-muted mt-3 text-sm leading-6">
                                            {card.description}
                                        </p>
                                    </div>

                                    <p className="exo-label relative z-10 mt-5 text-xs font-black uppercase tracking-[0.18em]">
                                        Відкрити →
                                    </p>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};