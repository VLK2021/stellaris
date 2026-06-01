import type {EarthOverview} from "@/src/types/earth/earth.types";

import {EarthPanel} from "./EarthPanel";

type Props = {
    data: EarthOverview;
    title: string;
};

export const EarthEpicTab = ({data, title}: Props) => {
    return (
        <EarthPanel title={title}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.epicImages.map((image) => (
                    <div
                        key={image.id}
                        className="overflow-hidden rounded-[1.3rem] border border-[var(--color-border)] bg-[var(--color-glass)]"
                    >
                        <img
                            src={image.imageUrl}
                            alt={image.caption}
                            className="aspect-square w-full object-cover"
                        />

                        <div className="p-4">
                            <p className="text-sm font-black text-[var(--color-text)]">
                                {image.date}
                            </p>

                            <p className="mt-2 text-xs leading-5 text-[var(--color-text-muted)]">
                                {image.caption}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </EarthPanel>
    );
};