import type {EarthEventGeometry} from "@/src/types/earth/earth.types";
import type {EarthLocale} from "@/src/types/earth/earthUi.types";

type Props = {
    geometry: EarthEventGeometry[];
    t: EarthLocale;
};

export const EarthEventGeometryList = ({geometry, t}: Props) => {
    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <h2 className="text-xl font-black uppercase">
                {t.details.geometryTrack}
            </h2>

            <div className="mt-4 max-h-[520px] overflow-y-auto pr-2">
                <div className="grid gap-3">
                    {geometry.map((item, index) => (
                        <div
                            key={`${item.date}-${index}`}
                            className="rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                                {t.details.point} #{index + 1}
                            </p>

                            <p className="mt-2 text-sm font-bold">
                                {item.date ?? "—"}
                            </p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {t.details.type}: {item.type ?? "—"}
                            </p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {t.details.coordinates}: {item.coordinates?.join(" / ") ?? "—"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};