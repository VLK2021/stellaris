import {NextRequest, NextResponse} from "next/server";

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
];

const allowedSort = new Set([
    "pl_name",
    "disc_year",
    "sy_dist",
    "pl_rade",
    "pl_bmasse",
    "pl_eqt",
]);

const safeSqlText = (value: string) => value.replaceAll("'", "''").trim();

const getNumber = (value: string | null, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

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

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = request.nextUrl;

        const page = Math.max(1, getNumber(searchParams.get("page"), 1));
        const limit = Math.min(48, Math.max(12, getNumber(searchParams.get("limit"), 12)));

        const search = safeSqlText(searchParams.get("search") ?? "");
        const method = safeSqlText(searchParams.get("method") ?? "");

        const sortByRaw = searchParams.get("sortBy") ?? "disc_year";
        const sortBy = allowedSort.has(sortByRaw) ? sortByRaw : "disc_year";
        const order = searchParams.get("order") === "asc" ? "asc" : "desc";

        const where: string[] = ["default_flag = 1"];

        if (search) {
            where.push(`(lower(pl_name) like lower('%${search}%') or lower(hostname) like lower('%${search}%'))`);
        }

        if (method) {
            where.push(`discoverymethod = '${method}'`);
        }

        const whereSql = where.join(" and ");
        const requestLimit = page * limit;
        const start = (page - 1) * limit;
        const end = start + limit;

        const dataQuery = `
            select top ${requestLimit}
            ${COLUMNS.join(",")}
            from ps
            where ${whereSql}
            order by ${sortBy} ${order}
        `;

        const countQuery = `
            select count(*) as total
            from ps
            where ${whereSql}
        `;

        const [rowsRaw, countRaw] = await Promise.all([
            fetchTap(dataQuery),
            fetchTap(countQuery),
        ]);

        const rows = Array.isArray(rowsRaw) ? rowsRaw : [];
        const total = Array.isArray(countRaw) ? Number(countRaw[0]?.total ?? 0) : 0;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const data = rows.slice(start, end);

        return NextResponse.json({
            success: true,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Failed to load exoplanets catalog.",
            },
            {status: 500},
        );
    }
}