import type {MarsLocale, MarsRoverSummary} from "@/src/types/mars";

import {MarsRoverPreviewCard} from "./MarsRoverPreviewCard";

type Props = {
    rovers: MarsRoverSummary[];
    t: MarsLocale;
};

export const MarsRoversGrid = ({rovers, t}: Props) => {
    return (
        <section className="grid gap-5 xl:grid-cols-2">
            {rovers.map((rover) => (
                <MarsRoverPreviewCard
                    key={rover.name}
                    rover={rover}
                    t={t}
                />
            ))}
        </section>
    );
};