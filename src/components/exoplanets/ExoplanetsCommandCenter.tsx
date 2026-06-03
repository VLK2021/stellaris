"use client";

import Link from "next/link";
import {motion} from "framer-motion";
import {Atom, Database, Orbit, Radar, Sparkles, Telescope} from "lucide-react";

const modules = [
    {
        href: "/exoplanets/catalog",
        title: "Каталог екзопланет",
        text: "Планети, маса, радіус, орбіта, температура та метод відкриття.",
        icon: Database,
        position: "left-[5%] top-[12%]",
    },
    {
        href: "/exoplanets/systems",
        title: "Зоряні системи",
        text: "Системи, хост-зірки, кількість планет та відстані.",
        icon: Orbit,
        position: "right-[5%] top-[12%]",
    },
    {
        href: "/exoplanets/stars",
        title: "Зірки-хости",
        text: "Зорі, навколо яких обертаються підтверджені екзопланети.",
        icon: Sparkles,
        position: "left-[2%] bottom-[12%]",
    },
    {
        href: "/exoplanets/methods",
        title: "Методи відкриття",
        text: "Transit, Radial Velocity, Imaging, Microlensing та інші методи.",
        icon: Radar,
        position: "right-[2%] bottom-[12%]",
    },
    {
        href: "/exoplanets/atmospheres",
        title: "Атмосфери",
        text: "Спектроскопія атмосфер і наукові спостереження планет.",
        icon: Atom,
        position: "left-1/2 top-[4%] -translate-x-1/2",
    },
    {
        href: "/exoplanets/archive",
        title: "NASA Archive",
        text: "Таблиці TAP, набори даних і структура Exoplanet Archive.",
        icon: Telescope,
        position: "left-1/2 bottom-[4%] -translate-x-1/2",
    },
];

export const ExoplanetsCommandCenter = () => {
    return (
        <section className="relative min-h-[760px] overflow-hidden rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <motion.div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
                animate={{opacity: [0.45, 0.8, 0.45]}}
                transition={{duration: 8, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:90px_90px]" />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-accent)]/30"
                animate={{rotate: 360}}
                transition={{duration: 46, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[610px] w-[610px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-brand-secondary)]/25"
                animate={{rotate: -360}}
                transition={{duration: 70, repeat: Infinity, ease: "linear"}}
            />

            <motion.div
                className="absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]"
                animate={{scale: [1, 1.08, 1], opacity: [0.75, 1, 0.75]}}
                transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="absolute left-1/2 top-1/2 z-10 w-[260px] -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="exo-label text-[10px] font-black uppercase tracking-[0.24em]">
                    Exoplanet Portal
                </p>

                <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em]">
                    Command Center
                </h2>

                <p className="exo-muted mt-3 text-xs leading-6">
                    Обери напрям дослідження NASA Exoplanet Archive.
                </p>
            </div>

            {modules.map((item, index) => {
                const Icon = item.icon;

                return (
                    <motion.div
                        key={item.href}
                        initial={{opacity: 0, scale: 0.9, y: 20}}
                        whileInView={{opacity: 1, scale: 1, y: 0}}
                        viewport={{once: true, amount: 0.25}}
                        transition={{duration: 0.35, delay: index * 0.06}}
                        className={`absolute z-20 hidden w-[330px] xl:block ${item.position}`}
                    >
                        <Link
                            href={item.href}
                            className="group relative block min-h-[185px] overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl transition hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-glow)]"
                        >
                            <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-50" style={{background: "var(--hero-bg)"}} />

                            <div className="relative z-10">
                                <Icon className="h-6 w-6 text-[var(--color-accent)]" />

                                <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.04em]">
                                    {item.title}
                                </h3>

                                <p className="exo-muted mt-3 text-sm leading-6">
                                    {item.text}
                                </p>

                                <p className="exo-label mt-5 text-xs font-black uppercase tracking-[0.18em]">
                                    Відкрити →
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}

            <div className="relative z-20 grid gap-4 pt-[360px] xl:hidden">
                {modules.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <motion.div
                            key={item.href}
                            initial={{opacity: 0, y: 16}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.3, delay: index * 0.04}}
                        >
                            <Link
                                href={item.href}
                                className="block rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl"
                            >
                                <Icon className="h-5 w-5 text-[var(--color-accent)]" />

                                <h3 className="mt-4 text-xl font-black uppercase">
                                    {item.title}
                                </h3>

                                <p className="exo-muted mt-2 text-sm leading-6">
                                    {item.text}
                                </p>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};