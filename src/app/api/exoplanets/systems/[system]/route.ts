import {NextRequest, NextResponse} from "next/server";

const TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";

const COLUMNS = [
    "hostname",
    "sy_snum",
    "sy_pnum",
    "sy_mnum",
    "sy_dist",
    "st_spectype",
    "st_teff",
    "st_rad",
    "st_mass",
    "st_met",
    "st_logg",
    "st_age",
    "pl_name",
    "pl_rade",
    "pl_bmasse",
    "pl_orbper",
    "pl_eqt",
    "discoverymethod",
    "disc_year",
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
        throw new Error(`NASA Exoplanet Archive failed: ${response.status}. ${text.slice(0, 300)}`);
    }

    return response.json();
};

export async function GET(
    request: NextRequest,
    context: {params: Promise<{system: string}>},
) {
    try {
        const {system} = await context.params;
        const systemName = safeSqlText(decodeURIComponent(system));

        if (!systemName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "System name is required.",
                },
                {status: 400},
            );
        }

        const query = `
            select
            ${COLUMNS.join(",")}
            from ps
            where default_flag = 1
            and hostname = '${systemName}'
            order by pl_orbper asc
        `;

        const rowsRaw = await fetchTap(query);
        const rows = Array.isArray(rowsRaw) ? rowsRaw : [];

        if (!rows.length) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Star system not found.",
                },
                {status: 404},
            );
        }

        const systemData = rows[0];

        return NextResponse.json({
            success: true,
            data: {
                system: {
                    hostname: systemData.hostname ?? null,
                    sy_snum: systemData.sy_snum ?? null,
                    sy_pnum: systemData.sy_pnum ?? null,
                    sy_mnum: systemData.sy_mnum ?? null,
                    sy_dist: systemData.sy_dist ?? null,
                    st_spectype: systemData.st_spectype ?? null,
                    st_teff: systemData.st_teff ?? null,
                    st_rad: systemData.st_rad ?? null,
                    st_mass: systemData.st_mass ?? null,
                    st_met: systemData.st_met ?? null,
                    st_logg: systemData.st_logg ?? null,
                    st_age: systemData.st_age ?? null,
                },
                planets: rows.map((item) => ({
                    pl_name: item.pl_name ?? null,
                    pl_rade: item.pl_rade ?? null,
                    pl_bmasse: item.pl_bmasse ?? null,
                    pl_orbper: item.pl_orbper ?? null,
                    pl_eqt: item.pl_eqt ?? null,
                    discoverymethod: item.discoverymethod ?? null,
                    disc_year: item.disc_year ?? null,
                })),
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Failed to load star system.",
            },
            {status: 500},
        );
    }
}