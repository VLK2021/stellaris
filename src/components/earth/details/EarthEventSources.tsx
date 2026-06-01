import type {EarthEventSource} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    sources: EarthEventSource[];
    t: EarthLocale;
};

export const EarthEventSources = ({sources, t}: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <h2 className="text-xl font-black uppercase">
                {t.details.sources}
            </h2>

            <div className="mt-4 grid gap-3">
                {sources.map((source) => (
                    <a
                        key={`${source.id}-${source.url}`}
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 text-sm text-[var(--color-accent)] transition hover:border-[var(--color-accent)]"
                    >
                        <p className="font-black">{source.id}</p>
                        <p className="mt-1 break-all text-xs">{source.url}</p>
                        <p className="mt-3 text-xs font-black uppercase tracking-[0.16em]">
                            {t.details.openSource} →
                        </p>
                    </a>
                ))}
            </div>
        </section>
    );
};