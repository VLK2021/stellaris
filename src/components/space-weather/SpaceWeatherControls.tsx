"use client";

import type {ReactNode} from "react";
import {Controller, useForm, useWatch} from "react-hook-form";
import {motion} from "framer-motion";
import {X} from "lucide-react";

import {SPACE_WEATHER_EVENT_TYPES} from "@/src/constants/space-weather/spaceWeather.constants";
import type {
    SpaceWeatherExplorerState,
    SpaceWeatherLocale,
    SpaceWeatherTab,
} from "@/src/types/space-weather/spaceWeatherUi.types";

type Props = {
    locale: SpaceWeatherLocale;
    defaultValues: SpaceWeatherExplorerState;
    loading: boolean;
    onLoad: (values: SpaceWeatherExplorerState) => void;
};

const tabs: SpaceWeatherTab[] = ["overview", "events", "notifications"];

export const SpaceWeatherControls = ({
                                         locale,
                                         defaultValues,
                                         loading,
                                         onLoad,
                                     }: Props) => {
    const {control, handleSubmit, setValue} = useForm<SpaceWeatherExplorerState>({
        defaultValues,
        mode: "onChange",
    });

    const tab = useWatch({control, name: "tab"});

    return (
        <motion.form
            onSubmit={handleSubmit(onLoad)}
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.45}}
            className="mt-5 rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5"
        >
            <Controller
                control={control}
                name="tab"
                render={({field}) => (
                    <div className="flex flex-wrap gap-2.5">
                        {tabs.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => field.onChange(item)}
                                className={`rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.16em] transition ${
                                    field.value === item
                                        ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-glow)]"
                                        : "border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
                                }`}
                            >
                                {locale[item]}
                            </button>
                        ))}
                    </div>
                )}
            />

            <div className="mt-5 grid gap-3.5 md:grid-cols-2 xl:grid-cols-5">
                <Field label={locale.startDate}>
                    <Controller
                        control={control}
                        name="startDate"
                        render={({field}) => (
                            <ClearableInput
                                value={field.value}
                                type="date"
                                locale={locale}
                                onChange={field.onChange}
                                onClear={() => setValue("startDate", "")}
                            />
                        )}
                    />
                </Field>

                <Field label={locale.endDate}>
                    <Controller
                        control={control}
                        name="endDate"
                        render={({field}) => (
                            <ClearableInput
                                value={field.value}
                                type="date"
                                locale={locale}
                                onChange={field.onChange}
                                onClear={() => setValue("endDate", "")}
                            />
                        )}
                    />
                </Field>

                {tab === "events" && (
                    <Field label={locale.type}>
                        <Controller
                            control={control}
                            name="type"
                            render={({field}) => (
                                <select {...field} className="input">
                                    {SPACE_WEATHER_EVENT_TYPES.map((item) => (
                                        <option key={item} value={item}>
                                            {item === "all" ? locale.all : item}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                    </Field>
                )}

                <div className="flex items-end xl:col-span-2">
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full rounded-2xl bg-[var(--color-accent)] px-5 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:scale-[1.018] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? locale.loading : locale.load}
                    </button>
                </div>
            </div>
        </motion.form>
    );
};

const Field = ({label, children}: {label: string; children: ReactNode}) => (
    <label className="grid gap-2">
        <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[var(--color-text-soft)]">
            {label}
        </span>
        {children}
    </label>
);

const ClearableInput = ({
                            value,
                            type,
                            onChange,
                            onClear,
                            locale,
                        }: {
    value: string;
    type: "date" | "text";
    onChange: (value: string) => void;
    onClear: () => void;
    locale: SpaceWeatherLocale;
}) => (
    <div className="relative">
        <input
            type={type}
            value={value ?? ""}
            onChange={(event) => onChange(event.target.value)}
            className="input pr-12"
        />

        {value && (
            <button
                type="button"
                onClick={onClear}
                aria-label={locale.clear}
                className="absolute right-3 top-1/2 z-20 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-accent)]"
            >
                <X className="h-3.5 w-3.5" />
            </button>
        )}
    </div>
);