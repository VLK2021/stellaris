"use client";

import type {ExoplanetMethodItem} from "@/src/types/exoplanets/methods.types";
import type {ExoplanetsLocale} from "@/src/types/exoplanets/exoplanetsUi.types";

import {ExoplanetsMethodsCard} from "./ExoplanetsMethodsCard";

type Props = {
    items: ExoplanetMethodItem[];
    t: ExoplanetsLocale["methods"];
};

export const ExoplanetsMethodsList = ({items, t}: Props) => {
    return (
        <section className="grid gap-4 xl:grid-cols-2">
            {items.map((item, index) => (
                <ExoplanetsMethodsCard
                    key={`${item.method}-${index}`}
                    item={item}
                    index={index}
                    t={t}
                />
            ))}
        </section>
    );
};