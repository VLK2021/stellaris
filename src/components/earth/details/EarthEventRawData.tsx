import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    raw: Record<string, unknown>;
    t: EarthLocale;
};

export const EarthEventRawData = ({raw, t}: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <h2 className="text-xl font-black uppercase">
                {t.details.rawPayload}
            </h2>

            <pre className="mt-4 max-h-[600px] overflow-auto rounded-[1.2rem] border border-[var(--color-border)] bg-black/30 p-4 text-xs leading-6 text-[var(--color-text-muted)]">
                {JSON.stringify(raw, null, 2)}
            </pre>
        </section>
    );
};