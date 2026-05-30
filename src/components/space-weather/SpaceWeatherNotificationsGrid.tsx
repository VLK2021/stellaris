"use client";

import {motion} from "framer-motion";
import {ExternalLink, MessageSquareWarning} from "lucide-react";

import type {SpaceWeatherNotification} from "@/src/types/space-weather/spaceWeatherNotification.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

type Props = {
    locale: SpaceWeatherLocale;
    notifications: SpaceWeatherNotification[];
};

export const SpaceWeatherNotificationsGrid = ({
                                                  locale,
                                                  notifications,
                                              }: Props) => {
    if (!notifications.length) {
        return (
            <div className="mt-5 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-7 text-center text-sm text-[var(--color-text-muted)]">
                {locale.noData}
            </div>
        );
    }

    return (
        <section className="mt-5 grid gap-4 lg:grid-cols-2">
            {notifications.map((item, index) => (
                <motion.article
                    key={`${item.id}-${index}`}
                    initial={{opacity: 0, y: 16}}
                    whileInView={{opacity: 1, y: 0}}
                    whileHover={{y: -5}}
                    viewport={{once: true}}
                    transition={{duration: 0.35}}
                    className="relative overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-xl"
                >
                    <div className="absolute right-[-40px] top-[-40px] h-28 w-28 rounded-full bg-[var(--color-warning)]/10 blur-2xl" />

                    <div className="relative z-10">
                        <div className="flex items-start gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                                <MessageSquareWarning className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                    {item.type}
                                </p>

                                <h3 className="mt-2 text-lg font-black tracking-[-0.04em] text-[var(--color-text)]">
                                    {item.title}
                                </h3>

                                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                    {locale.issueTime}: {item.issueTime ?? "—"}
                                </p>
                            </div>
                        </div>

                        <p className="mt-4 line-clamp-6 whitespace-pre-line text-xs leading-6 text-[var(--color-text-muted)]">
                            {item.body}
                        </p>

                        {item.url && (
                            <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-[11px] font-black text-white transition hover:gap-3"
                            >
                                {locale.source}
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        )}
                    </div>
                </motion.article>
            ))}
        </section>
    );
};