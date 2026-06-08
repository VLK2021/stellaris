import type {MarsRoverStatus} from "@/src/types/mars";

export const formatMarsNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value);
};

export const getMarsStatusLabel = (status: MarsRoverStatus, active: string, complete: string) => {
    return status === "active" ? active : complete;
};

export const getMarsStatusClass = (status: MarsRoverStatus) => {
    return status === "active"
        ? "border-emerald-300/25 bg-emerald-400/10 text-emerald-200"
        : "border-white/10 bg-white/[0.04] text-white/55";
};

export const getRoverAccent = (index: number) => {
    const accents = [
        "from-orange-300/24 via-orange-600/12 to-transparent",
        "from-sky-300/18 via-orange-400/10 to-transparent",
        "from-amber-200/20 via-red-500/10 to-transparent",
        "from-red-300/18 via-stone-400/10 to-transparent",
    ];

    return accents[index % accents.length];
};