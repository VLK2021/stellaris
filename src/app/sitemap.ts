import type {MetadataRoute} from "next";

import {BRAND} from "@/src/constants/brand";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",

        "/manifest",

        "/apod",

        "/earth",

        "/mars",
        "/mars/photos",
        "/mars/rovers",

        "/media",

        "/missions",

        "/asteroids",

        "/space-weather",

        "/exoplanets",
        "/exoplanets/catalog",
        "/exoplanets/habitable",
        "/exoplanets/atmospheres",
        "/exoplanets/methods",
        "/exoplanets/systems",
    ];

    return routes.map((route) => ({
        url: `${BRAND.url}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
    }));
}