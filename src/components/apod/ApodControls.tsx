"use client";

import {useEffect} from "react";
import {Controller, useForm, useWatch} from "react-hook-form";
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

    const mode = useWatch({
        control,
        name: "mode",
    });

    useEffect(() => {
        setValue("mode", mode);
    }, [mode, setValue]);

    return (
        <motion.form
            onSubmit={handleSubmit(onLoad)}
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.55}}
            className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-2xl"
        >
            <Controller
                control={control}
                name="mode"
                render={({field}) => (
                    <div className="flex flex-wrap gap-3">
                        {modes.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => field.onChange(item)}
                                className={`rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.18em] transition ${
                                    field.value === item
                                        ? "bg-cyan-300 text-slate-950"
                                        : "border border-white/10 bg-white/5 text-slate-300"
                                }`}
                            >
                                {locale[item === "date" ? "byDate" : item]}
                            </button>
                        ))}
                    </div>
                )}
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
                        className="w-full rounded-2xl bg-cyan-300 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? locale.loading : locale.load}
                    </button>
                </div>
            </div>
        </motion.form>
    );
};

const Field = ({
                   label,
                   children,
               }: {
    label: string;
    children: React.ReactNode;
}) => (
    <label className="grid gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
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
    register: ReturnType<typeof useForm<ApodExplorerState>>["register"] extends (
            name: never,
        ) => infer R
        ? R
        : never;
    onClear: () => void;
    locale: ApodExplorerLocale;
}) => {
    return (
        <div className="relative">
            <input {...register} type={type} className="input pr-11" />

            <button
                type="button"
                onClick={onClear}
                aria-label={locale.clear}
                className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-300"
            >
                <X className="h-3.5 w-3.5" />
            </button>
        </div>
    );
};