"use client";

import {
    Code2,
    Database,
    ShieldCheck,
    Sparkles,
} from "lucide-react";

import {useLanguage} from "@/src/context";

const NASA_LOGO_URL =
    "https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg";

export const ManifestPage = () => {
    const {locale} = useLanguage();
    const t = locale.manifestPage;

    return (
        <main className="relative min-h-screen overflow-hidden bg-[var(--body-bg)] text-[var(--color-text)]">
            <div className="pointer-events-none fixed inset-0">
                <div
                    className="absolute inset-0"
                    style={{background: "var(--hero-bg)"}}
                />
                <div className="absolute inset-0 bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />
                <div className="absolute left-[-16rem] top-[8rem] h-[36rem] w-[36rem] rounded-full bg-[var(--color-accent-soft)] blur-3xl" />
                <div className="absolute right-[-18rem] bottom-[-12rem] h-[40rem] w-[40rem] rounded-full bg-[var(--color-glass)] blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto grid max-w-[1400px] gap-6 px-4 py-8 sm:px-6 lg:px-8">
                <section className="relative overflow-hidden rounded-[2.6rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl md:p-10">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,var(--color-accent-soft),transparent_34%)]" />

                    <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-center">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                                <Sparkles className="h-4 w-4" />
                                {t.eyebrow}
                            </p>

                            <h1 className="mt-6 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-6xl font-black uppercase leading-[0.86] tracking-[-0.09em] text-transparent md:text-8xl">
                                {t.title}
                            </h1>

                            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-muted)]">
                                {t.subtitle}
                            </p>
                        </div>

                        <aside className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass-strong)] p-6 backdrop-blur-xl">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-accent-soft),transparent_42%)]" />

                            <div className="relative z-10">
                                <div className="grid h-32 w-32 place-items-center rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card-solid)] p-5 shadow-[var(--shadow-glow)]">
                                    <img
                                        src={NASA_LOGO_URL}
                                        alt="NASA logo"
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                                    {t.nasaBadge}
                                </p>

                                <p className="mt-3 text-2xl font-black uppercase tracking-[-0.05em] text-[var(--color-text)]">
                                    {t.nasaLabel}
                                </p>
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-4">
                    {t.facts.map((item) => (
                        <article
                            key={item.label}
                            className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl"
                        >
                            <p className="bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-3xl font-black uppercase text-transparent">
                                {item.value}
                            </p>

                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                                {item.label}
                            </p>
                        </article>
                    ))}
                </section>

                <section className="grid gap-6 lg:grid-cols-3">
                    <ManifestBlock
                        icon={Database}
                        title={t.aboutTitle}
                        text={t.aboutText}
                    />

                    <ManifestBlock
                        icon={ShieldCheck}
                        title={t.dataTitle}
                        text={t.dataText}
                    />

                    <ManifestBlock
                        icon={Code2}
                        title={t.techTitle}
                        text={t.techText}
                    />
                </section>

                <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-6 backdrop-blur-2xl md:p-8">
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">
                        {t.techTitle}
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-3">
                        {t.technologies.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-4 py-2 text-sm font-black text-[var(--color-text-muted)]"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </section>

                <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl md:p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {t.disclaimerTitle}
                    </p>

                    <p className="mt-4 max-w-4xl text-base leading-8 text-[var(--color-text-muted)]">
                        {t.disclaimerText}
                    </p>
                </section>
            </div>
        </main>
    );
};

const ManifestBlock = ({
                           icon: Icon,
                           title,
                           text,
                       }: {
    icon: typeof Database;
    title: string;
    text: string;
}) => (
    <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-6 shadow-[var(--shadow-card)] backdrop-blur-2xl">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)]">
            <Icon className="h-5 w-5 text-[var(--color-accent)]" />
        </div>

        <h2 className="mt-6 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-2xl font-black uppercase tracking-[-0.05em] text-transparent">
            {title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
            {text}
        </p>
    </article>
);