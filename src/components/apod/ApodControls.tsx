"use client";

import {useEffect} from "react";
import {Controller, useForm, useWatch, UseFormRegisterReturn} from "react-hook-form";
import {X} from "lucide-react";
import {motion} from "framer-motion";

import type {
    ApodExplorerLocale,
    ApodExplorerState,
    ApodMediaFilter,
    ApodMode,
    ApodSort,
} from "@/src/types/apod/apod.types";

type Props = {
    locale: ApodExplorerLocale;
    defaultValues: ApodExplorerState;
    onLoad: (values: ApodExplorerState) => void;
    loading: boolean;
};

const modes: ApodMode[] = ["today", "date", "range", "random"];
const sorts: ApodSort[] = ["newest", "oldest"];
const filters: ApodMediaFilter[] = ["all", "image", "video", "other"];

export const ApodControls = ({
                                 locale,
                                 defaultValues,
                                 onLoad,
                                 loading,
                             }: Props) => {
    const {control, register, handleSubmit, resetField, setValue} =
        useForm<ApodExplorerState>({
            defaultValues,
        });

    const mode = useWatch({control, name: "mode"});

    useEffect(() => {
        setValue("mode", mode);
    }, [mode, setValue]);

    return (
        <motion.form
            onSubmit={handleSubmit(onLoad)}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5}}
            className="mt-6 rounded-[1.7rem] border border-white/10 bg-white/[0.032] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:p-5"
        >
            <Controller
                control={control}
                name="mode"
                render={({field}) => (
                    <div className="flex flex-wrap gap-2.5">
                        {modes.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => field.onChange(item)}
                                className={`rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.17em] transition ${
                                    field.value === item
                                        ? "bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.25)]"
                                        : "border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/30"
                                }`}
                            >
                                {locale[item === "date" ? "byDate" : item]}
                            </button>
                        ))}
                    </div>
                )}
            />

            <div className="mt-5 grid gap-3.5 md:grid-cols-2 xl:grid-cols-5">
                {mode === "date" && (
                    <Field label={locale.selectedDate}>
                        <ClearableInput
                            type="date"
                            register={register("date")}
                            onClear={() => resetField("date")}
                            locale={locale}
                        />
                    </Field>
                )}

                {mode === "range" && (
                    <>
                        <Field label={locale.startDate}>
                            <ClearableInput
                                type="date"
                                register={register("startDate")}
                                onClear={() => resetField("startDate")}
                                locale={locale}
                            />
                        </Field>

                        <Field label={locale.endDate}>
                            <ClearableInput
                                type="date"
                                register={register("endDate")}
                                onClear={() => resetField("endDate")}
                                locale={locale}
                            />
                        </Field>
                    </>
                )}

                {mode === "random" && (
                    <Field label={locale.count}>
                        <select
                            {...register("count", {valueAsNumber: true})}
                            className="input"
                        >
                            {[3, 6, 9, 12, 18, 24].map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </Field>
                )}

                <Field label={locale.sort}>
                    <select {...register("sort")} className="input">
                        {sorts.map((sort) => (
                            <option key={sort} value={sort}>
                                {locale[sort]}
                            </option>
                        ))}
                    </select>
                </Field>

                <Field label={locale.media}>
                    <select {...register("mediaFilter")} className="input">
                        {filters.map((filter) => (
                            <option key={filter} value={filter}>
                                {locale[filter]}
                            </option>
                        ))}
                    </select>
                </Field>

                <div className="flex items-end">
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full rounded-2xl bg-cyan-300 px-5 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-slate-950 transition hover:scale-[1.018] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? locale.loading : locale.load}
                    </button>
                </div>
            </div>
        </motion.form>
    );
};

const Field = ({label, children}: {label: string; children: React.ReactNode}) => (
    <label className="grid gap-2">
        <span className="text-[9px] font-black uppercase tracking-[0.22em] text-slate-500">
            {label}
        </span>
        {children}
    </label>
);

const ClearableInput = ({
                            type,
                            register,
                            onClear,
                            locale,
                        }: {
    type: "date" | "text";
    register: UseFormRegisterReturn;
    onClear: () => void;
    locale: ApodExplorerLocale;
}) => (
    <div className="relative">
        <input {...register} type={type} className="input pr-10" />

        <button
            type="button"
            onClick={onClear}
            aria-label={locale.clear}
            className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-300"
        >
            <X className="h-3.5 w-3.5" />
        </button>
    </div>
);