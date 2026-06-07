import {NextResponse} from "next/server";

const TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

const COLUMNS = [
    "pl_name",
    "hostname",
    "sy_dist",
    "disc_year",
    "discoverymethod",
    "pl_rade",
    "pl_bmasse",
    "pl_orbper",
    "pl_eqt",
    "pl_dens",
    "pl_insol",
    "st_teff",
    "st_rad",
    "st_mass",
];

const safeSqlText = (value: string) => value.replaceAll("'", "''").trim();

const fetchTap = async (query: string) => {
    const url = new URL(TAP_URL);

    url.searchParams.set("query", query.replace(/\s+/g, " ").trim());
    url.searchParams.set("format", "json");

    const response = await fetch(url.toString(), {
        next: {revalidate: 60 * 30},
    });

    if (!response.ok) {
        const text = await response.text();

        throw new Error(
            `NASA Exoplanet Archive failed: ${response.status}. ${text.slice(0, 500)}`,
        );
    }

    return response.json();
};

const getTemperatureClass = (temperature: number | null) => {
    if (temperature === null || !Number.isFinite(temperature)) return "unknown";
    if (temperature < 180) return "cold";
    if (temperature <= 330) return "temperate";
    if (temperature <= 700) return "warm";

    return "hot";
};

const getCandidateType = ({
                              radius,
                              mass,
                              density,
                              temperature,
                          }: {
    radius: number | null;
    mass: number | null;
    density: number | null;
    temperature: number | null;
}) => {
    if (radius !== null && radius <= 1.6 && temperature !== null && temperature <= 330) {
        return "rocky_candidate";
    }

    if (radius !== null && radius > 1.6 && radius <= 4) return "sub_neptune";
    if (radius !== null && radius > 4) return "gas_giant";
    if (density !== null && density < 1.5 && mass !== null && mass > 5) return "low_density";

    return "unknown";
};

const getAtmosphereScore = ({
                                radius,
                                mass,
                                density,
                                temperature,
                                insol,
                                starTemperature,
                            }: {
    radius: number | null;
    mass: number | null;
    density: number | null;
    temperature: number | null;
    insol: number | null;
    starTemperature: number | null;
}) => {
    let score = 0;

    if (radius !== null) {
        if (radius >= 0.5 && radius <= 1.8) score += 24;
        else if (radius > 1.8 && radius <= 4) score += 18;
        else if (radius > 4 && radius <= 14) score += 12;
    }

    if (mass !== null) {
        if (mass >= 0.3 && mass <= 8) score += 20;
        else if (mass > 8 && mass <= 80) score += 12;
    }

    if (temperature !== null) {
        if (temperature >= 180 && temperature <= 330) score += 28;
        else if (temperature > 330 && temperature <= 700) score += 16;
        else if (temperature < 180) score += 10;
    }

    if (density !== null) {
        if (density >= 2.5 && density <= 8) score += 14;
        else if (density > 0 && density < 2.5) score += 10;
    }

    if (insol !== null) {
        if (insol >= 0.25 && insol <= 2) score += 8;
        else if (insol > 2 && insol <= 20) score += 4;
    }

    if (starTemperature !== null && starTemperature >= 3000 && starTemperature <= 6500) {
        score += 6;
    }

    return Math.min(100, score);
};

export async function GET(
    request: Request,
    context: {params: Promise<{planet: string}>},
) {
    try {
        const {planet} = await context.params;
        const planetName = safeSqlText(decodeURIComponent(planet));

        const query = `
            select
            ${COLUMNS.join(",")}
            from ps
            where default_flag = 1
            and pl_name = '${planetName}'
        `;

        const rowsRaw = await fetchTap(query);
        const rows = Array.isArray(rowsRaw) ? rowsRaw : [];

        if (!rows.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Atmosphere candidate not found.",
                },
                {status: 404},
            );
        }

        const item = rows[0];

        const radius = item.pl_rade === null ? null : Number(item.pl_rade);
        const mass = item.pl_bmasse === null ? null : Number(item.pl_bmasse);
        const density = item.pl_dens === null ? null : Number(item.pl_dens);
        const temperature = item.pl_eqt === null ? null : Number(item.pl_eqt);
        const insol = item.pl_insol === null ? null : Number(item.pl_insol);
        const starTemperature = item.st_teff === null ? null : Number(item.st_teff);

        return NextResponse.json({
            success: true,
            data: {
                ...item,
                atmosphereScore: getAtmosphereScore({
                    radius,
                    mass,
                    density,
                    temperature,
                    insol,
                    starTemperature,
                }),
                atmosphereClass: getTemperatureClass(temperature),
                candidateType: getCandidateType({
                    radius,
                    mass,
                    density,
                    temperature,
                }),
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load atmosphere candidate.",
            },
            {status: 500},
        );
    }
}