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
    "st_teff",
    "st_rad",
    "st_mass",
    "st_age",
    "st_spectype",
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
            `NASA Exoplanet Archive failed: ${response.status}. ${text.slice(0, 300)}`,
        );
    }

    return response.json();
};

const scoreRange = (value: number | null, ideal: number, tolerance: number) => {
    if (value === null || !Number.isFinite(value)) return 0;

    const diff = Math.abs(value - ideal);

    return Math.max(0, 1 - diff / tolerance);
};

const getHabitabilityScore = (item: Record<string, number | string | null>) => {
    const radiusScore = scoreRange(Number(item.pl_rade), 1, 1.2) * 28;
    const massScore = scoreRange(Number(item.pl_bmasse), 1, 4) * 24;
    const tempScore = scoreRange(Number(item.pl_eqt), 288, 110) * 32;
    const distanceScore = Number(item.sy_dist) && Number(item.sy_dist) < 150 ? 8 : 0;
    const starScore = scoreRange(Number(item.st_teff), 5778, 2200) * 8;

    return Math.round(radiusScore + massScore + tempScore + distanceScore + starScore);
};

const getZone = (temperature: number | null) => {
    if (temperature === null || !Number.isFinite(temperature)) return "unknown";
    if (temperature < 180) return "cold";
    if (temperature <= 330) return "temperate";
    return "hot";
};

export async function GET(
    request: Request,
    context: {params: Promise<{planet: string}>},
) {
    try {
        const {planet} = await context.params;
        const planetName = safeSqlText(decodeURIComponent(planet));

        if (!planetName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Planet name is required.",
                },
                {status: 400},
            );
        }

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
                    message: "Planet not found.",
                },
                {status: 404},
            );
        }

        const item = rows[0];
        const pl_eqt = item.pl_eqt === null ? null : Number(item.pl_eqt);

        return NextResponse.json({
            success: true,
            data: {
                ...item,
                habitabilityScore: getHabitabilityScore(item),
                habitabilityZone: getZone(pl_eqt),
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load habitable world.",
            },
            {status: 500},
        );
    }
}