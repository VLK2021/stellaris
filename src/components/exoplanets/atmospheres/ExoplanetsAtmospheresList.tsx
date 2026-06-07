"use client";

import type {AtmosphereItem} from "@/src/types/exoplanets/atmospheres.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetsAtmospheresCard} from "./ExoplanetsAtmospheresCard";

type Props = {
    items: AtmosphereItem[];
    t: ExoplanetsLocale["atmospheres"];
};

export const ExoplanetsAtmospheresList = ({items, t}: Props) => {
    return (
        <section className="grid gap-4 xl:grid-cols-2">
            {items.map((item, index) => (
                <ExoplanetsAtmospheresCard
                    key={`${item.pl_name}-${item.instrument}-${index}`}
                    item={item}
                    index={index}
                    t={t}
                />
            ))}
        </section>
    );
};