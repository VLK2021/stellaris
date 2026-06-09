import type {Dispatch, SetStateAction} from "react";

import type {MarsFilters, MarsLocale} from "@/src/types/mars";

import type {MarsPhotoFormState, MarsPhotoSort} from "./MarsPhotosPage";

type Props = {
    filters: MarsFilters;
    form: MarsPhotoFormState;
    setForm: Dispatch<SetStateAction<MarsPhotoFormState>>;
    t: MarsLocale;
};

const sortOptions: {value: MarsPhotoSort; labelKey: keyof MarsLocale}[] = [
    {value: "newest", labelKey: "sortNewest"},
    {value: "oldest", labelKey: "sortOldest"},
    {value: "solDesc", labelKey: "sortSolDesc"},
    {value: "solAsc", labelKey: "sortSolAsc"},
];

export const MarsPhotosFilters = ({filters, form, setForm, t}: Props) => {
    const activeRover = filters.rovers.find((rover) => rover.name === form.rover);

    const update = <K extends keyof MarsPhotoFormState>(
        key: K,
        value: MarsPhotoFormState[K],
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
            page: key === "page" ? value as number : 1,
        }));
    };

    const reset = () => {
        const first = filters.rovers[0];

        if (!first) return;

        setForm({
            rover: first.name,
            camera: "",
            earthDate: first.defaultEarthDate,
            sol: "",
            page: 1,
            sort: "newest",
        });
    };

    return (
        <section className="rounded-[2.2rem] border border-[var(--mars-border)] bg-[var(--mars-surface)] p-5 shadow-[var(--mars-glow)]">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[var(--mars-accent)]">
                {t.filters}
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <Field label={t.selectRover}>
                    <select
                        value={form.rover}
                        onChange={(event) => {
                            const rover = filters.rovers.find(
                                (item) => item.name === event.target.value,
                            );

                            if (!rover) return;

                            setForm((prev) => ({
                                ...prev,
                                rover: rover.name,
                                camera: "",
                                earthDate: rover.defaultEarthDate,
                                sol: "",
                                page: 1,
                            }));
                        }}
                        className="h-12 w-full rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-3 text-sm font-bold text-[var(--mars-text)] outline-none transition focus:border-[var(--mars-accent)] focus:shadow-[var(--mars-glow)]"
                    >
                        {filters.rovers.map((rover) => (
                            <option key={rover.name} value={rover.name}>
                                {rover.label}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label={t.selectCamera}>
                    <select
                        value={form.camera}
                        onChange={(event) => update("camera", event.target.value)}
                        className="h-12 w-full rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-3 text-sm font-bold text-[var(--mars-text)] outline-none transition focus:border-[var(--mars-accent)] focus:shadow-[var(--mars-glow)]"
                    >
                        <option value="">{t.allCameras}</option>
                        {(activeRover?.cameras ?? []).map((camera) => (
                            <option key={camera} value={camera}>
                                {camera}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label={t.earthDate}>
                    <input
                        type="date"
                        value={form.earthDate}
                        onChange={(event) => update("earthDate", event.target.value)}
                        className="h-12 w-full rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-3 text-sm font-bold text-[var(--mars-text)] outline-none transition focus:border-[var(--mars-accent)] focus:shadow-[var(--mars-glow)]"
                    />
                </Field>

                <Field label={t.marsSol}>
                    <input
                        type="number"
                        min={0}
                        value={form.sol}
                        onChange={(event) => update("sol", event.target.value)}
                        placeholder={String(activeRover?.defaultSol ?? "")}
                        className="h-12 w-full rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-3 text-sm font-bold text-[var(--mars-text)] outline-none transition focus:border-[var(--mars-accent)] focus:shadow-[var(--mars-glow)]"
                    />
                </Field>

                <Field label={t.sortBy}>
                    <select
                        value={form.sort}
                        onChange={(event) => update("sort", event.target.value as MarsPhotoSort)}
                        className="h-12 w-full rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] px-3 text-sm font-bold text-[var(--mars-text)] outline-none transition focus:border-[var(--mars-accent)] focus:shadow-[var(--mars-glow)]"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {t[option.labelKey]}
                            </option>
                        ))}
                    </select>
                </Field>

                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={reset}
                        className="h-12 w-full rounded-xl border border-[var(--mars-border)] bg-[var(--mars-surface-strong)] text-[10px] font-black uppercase tracking-[0.16em] text-[var(--mars-accent)] transition hover:border-[var(--mars-accent)]"
                    >
                        {t.resetFilters}
                    </button>
                </div>
            </div>
        </section>
    );
};

const Field = ({label, children}: {label: string; children: React.ReactNode}) => (
    <label className="grid gap-2">
        <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--mars-muted)]">
            {label}
        </span>
        {children}
    </label>
);