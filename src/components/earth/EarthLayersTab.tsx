import type {EarthOverview} from "@/src/types/earth/earth.types";

import {EarthPanel} from "./EarthPanel";

type Props = {
    data: EarthOverview;
    title: string;
};

export const EarthLayersTab = ({data, title}: Props) => {
    return (
        <EarthPanel title={title}>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {data.layers.map((layer) => (
                    <div
                        key={layer.id}
                        className="rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
                    >
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)]">
                            {layer.format ?? "NASA GIBS"}
                        </p>

                        <h3 className="mt-2 text-sm font-black text-[var(--color-text)]">
                            {layer.title}
                        </h3>

                        <p className="mt-2 break-words text-xs text-[var(--color-text-muted)]">
                            {layer.id}
                        </p>
                    </div>
                ))}
            </div>
        </EarthPanel>
    );
};