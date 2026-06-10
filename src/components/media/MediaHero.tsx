import {FileAudio, ImageIcon, Library, Video} from "lucide-react";

import type {MediaLocale} from "@/src/types/media";

type Props = {
    t: MediaLocale;
};

export const MediaHero = ({t}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[2.8rem] border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)]">
            <div className="pointer-events-none absolute inset-0" style={{background: "var(--hero-bg)"}} />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_420px]">
                <div>
                    <p className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[var(--color-accent)]">
                        {t.eyebrow}
                    </p>

                    <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] text-[var(--color-text)] md:text-7xl">
                        {t.title}
                    </h1>

                    <p className="mt-5 max-w-4xl text-sm leading-7 text-[var(--color-text-muted)]">
                        {t.description}
                    </p>
                </div>

                <aside className="grid gap-3 sm:grid-cols-2">
                    <Tile icon={ImageIcon} label={t.images} />
                    <Tile icon={Video} label={t.videos} />
                    <Tile icon={FileAudio} label={t.audio} />
                    <Tile icon={Library} label={t.results} />
                </aside>
            </div>
        </section>
    );
};

const Tile = ({
                  icon: Icon,
                  label,
              }: {
    icon: typeof ImageIcon;
    label: string;
}) => (
    <div className="rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
        <Icon className="h-5 w-5 text-[var(--color-accent)]" />

        <p className="mt-4 text-sm font-black uppercase tracking-[0.12em] text-[var(--color-text)]">
            {label}
        </p>
    </div>
);