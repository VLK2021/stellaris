import {NextRequest, NextResponse} from "next/server";

const TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

const COLUMNS = [
    "pl_name",
    "hostname",
    "default_flag",
    "sy_snum",
    "sy_pnum",
    "sy_mnum",
    "discoverymethod",
    "disc_year",
    "disc_facility",
    "disc_telescope",
    "disc_instrument",
    "pl_orbper",
    "pl_orbsmax",
    "pl_rade",
    "pl_radj",
    "pl_bmasse",
    "pl_bmassj",
    "pl_dens",
    "pl_eqt",
    "pl_insol",
    "pl_orbeccen",
    "pl_orbincl",
    "pl_trandep",
    "pl_trandur",
    "pl_rvamp",
    "sy_dist",
    "sy_vmag",
    "sy_kmag",
    "sy_gaiamag",
    "st_spectype",
    "st_teff",
    "st_rad",
    "st_mass",
    "st_met",
    "st_logg",
    "st_age",
];

const safeSqlText = (value: string) => value.replaceAll("'", "''").trim();

type Props = {
    params: Promise<{
        planet: string;
    }>;
};

export async function GET(_request: NextRequest, {params}: Props) {
    try {
        const {planet} = await params;
        const planetName = safeSqlText(decodeURIComponent(planet));

        const query = `
            select top 1
            ${COLUMNS.join(",")}
            from ps
            where lower(pl_name) = lower('${planetName}')
            order by default_flag desc
        `.replace(/\s+/g, " ").trim();

        const url = new URL(TAP_URL);

        url.searchParams.set("query", query);
        url.searchParams.set("format", "json");

        const response = await fetch(url.toString(), {
            next: {
                revalidate: 60 * 60,
            },
        });

        if (!response.ok) {
            const text = await response.text();

            throw new Error(
                `NASA Exoplanet Archive failed: ${response.status}. ${text.slice(0, 300)}`,
            );
        }

        const rows = await response.json();
        const data = Array.isArray(rows) ? rows[0] ?? null : null;

        if (!data) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Exoplanet not found.",
                },
                {status: 404},
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load exoplanet details.",
            },
            {status: 500},
        );
    }
}