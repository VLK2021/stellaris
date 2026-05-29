"use client";

import {motion} from "framer-motion";
import {ExternalLink} from "lucide-react";

import type {ApodExplorerLocale, ApodItem} from "@/src/types/apod/apod.types";

type Props = {
    item: ApodItem | null;
    locale: ApodExplorerLocale;
};

export const ApodHero = ({item, locale}: Props) => {
    const image =
        item?.mediaType === "image" ? item.hdUrl ?? item.url : item?.thumbnailUrl;

    return (
        <section className="relative min-h-[440px] overflow-hidden rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)] shadow-[var(--shadow-card)] backdrop-blur-2xl sm:min-h-[500px] lg:min-h-[520px]">
            {image && (
                <motion.img
                    key={image}
                    src={image}
                    alt={item?.title ?? locale.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                    initial={{scale: 1.06}}
                    animate={{scale: 1}}
                    transition={{duration: 1.1}}
                />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-card-solid),rgba(255,255,255,0.72),rgba(255,255,255,0.08))] dark:bg-[linear-gradient(90deg,rgba(2,6,17,0.98),rgba(2,6,17,0.75),rgba(2,6,17,0.2))]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent" />

            <div className="relative z-10 flex min-h-[440px] flex-col justify-end p-5 sm:min-h-[500px] sm:p-7 lg:min-h-[520px] lg:p-9">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="max-w-3xl"
                >
                    <p className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        {locale.badge}
                    </p>

                    <h1 className="mt-5 max-w-4xl text-3xl font-black tracking-[-0.075em] text-[var(--color-text)] sm:text-5xl lg:text-[54px] lg:leading-[0.95]">
                        {item?.title ?? locale.title}
                    </h1>

                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        {item?.date ?? locale.text}
                    </p>

                    {item?.explanation && (
                        <p className="mt-5 line-clamp-4 max-w-2xl text-[13px] leading-6 text-[var(--color-text-muted)] sm:text-sm sm:leading-7">
                            {item.explanation}
                        </p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        {item?.hdUrl && (
                            <a
                                href={item.hdUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-xs font-black text-white transition hover:gap-4"
                            >
                                {locale.hd}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        )}

                        {item?.copyright && (
                            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[11px] text-[var(--color-text-muted)] backdrop-blur-xl">
                                © {item.copyright}
                            </span>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};