import type {Dispatch, SetStateAction} from "react";

import type {MediaLocale, MediaSort, MediaType} from "@/src/types/media";

import type {MediaFormState} from "./MediaPage";

type Props = {
    form: MediaFormState;
    setForm: Dispatch<SetStateAction<MediaFormState>>;
    updateUrl: (form: MediaFormState) => void;
    t: MediaLocale;
};

const sortOptions: {value: MediaSort; label: string}[] = [
    {value: "newest", label: "Newest"},
    {value: "oldest", label: "Oldest"},
    {value: "titleAsc", label: "Title A-Z"},
    {value: "titleDesc", label: "Title Z-A"},
];

export const MediaFilters = ({form, setForm, updateUrl, t}: Props) => {
    const update = <K extends keyof MediaFormState>(
        key: K,
        value: MediaFormState[K],
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
            page: 1,
        }));
    };

    const apply = () => {
        updateUrl({
            ...form,
            page: 1,
        });
    };

    const reset = () => {
        const nextForm: MediaFormState = {
            query: "mars",
            mediaType: "all",
            center: "",
            yearStart: "",
            yearEnd: "",
            page: 1,
            sort: "newest",
        };

        setForm(nextForm);
        updateUrl(nextForm);
    };

    return (
        <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)]">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
                <label className="grid gap-2 xl:col-span-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        {t.search}
                    </span>

                    <input
                        value={form.query}
                        onChange={(event) => update("query", event.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="input"
                    />
                </label>

                <label className="grid gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        {t.mediaType}
                    </span>

                    <select
                        value={form.mediaType}
                        onChange={(event) =>
                            update("mediaType", event.target.value as MediaType | "all")
                        }
                        className="input"
                    >
                        <option value="all">{t.allTypes}</option>
                        <option value="image">{t.images}</option>
                        <option value="video">{t.videos}</option>
                        <option value="audio">{t.audio}</option>
                    </select>
                </label>

                <label className="grid gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        {t.center}
                    </span>

                    <input
                        value={form.center}
                        onChange={(event) => update("center", event.target.value)}
                        placeholder={t.centerPlaceholder}
                        className="input"
                    />
                </label>

                <label className="grid gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        {t.yearStart}
                    </span>

                    <input
                        type="number"
                        min={1958}
                        value={form.yearStart}
                        onChange={(event) => update("yearStart", event.target.value)}
                        className="input"
                    />
                </label>

                <label className="grid gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        {t.yearEnd}
                    </span>

                    <input
                        type="number"
                        min={1958}
                        value={form.yearEnd}
                        onChange={(event) => update("yearEnd", event.target.value)}
                        className="input"
                    />
                </label>

                <label className="grid gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        Sort
                    </span>

                    <select
                        value={form.sort}
                        onChange={(event) =>
                            update("sort", event.target.value as MediaSort)
                        }
                        className="input"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={apply}
                    className="rounded-full bg-[var(--color-accent)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-[var(--shadow-glow)]"
                >
                    {t.apply}
                </button>

                <button
                    type="button"
                    onClick={reset}
                    className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-accent)]"
                >
                    {t.reset}
                </button>
            </div>
        </section>
    );
};