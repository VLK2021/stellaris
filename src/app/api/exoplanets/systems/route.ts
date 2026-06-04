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
];

const allowedSort = new Set([
    "hostname",
    "sy_dist",
    "sy_pnum",
    "st_teff",
    "st_mass",
    "st_rad",
    "st_age",
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

        const sortByRaw = searchParams.get("sortBy") ?? "sy_pnum";
        const sortBy = allowedSort.has(sortByRaw) ? sortByRaw : "sy_pnum";
        const order = searchParams.get("order") === "asc" ? "asc" : "desc";

        const where: string[] = ["default_flag = 1", "hostname is not null"];

        if (search) {
            where.push(`lower(hostname) like lower('%${search}%')`);
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
                message: error instanceof Error ? error.message : "Failed to load star systems.",
            },
            {status: 500},
        );
    }
}