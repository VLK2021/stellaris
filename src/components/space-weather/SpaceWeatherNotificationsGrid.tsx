"use client";

import {motion} from "framer-motion";
import {ExternalLink, MessageSquareWarning, ShieldAlert} from "lucide-react";

import type {SpaceWeatherNotification} from "@/src/types/space-weather/spaceWeatherNotification.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

type Props = {
    locale: SpaceWeatherLocale;
    notifications: SpaceWeatherNotification[];
    compact?: boolean;
};

export const SpaceWeatherNotificationsGrid = ({
                                                  locale,
                                                  notifications,
                                                  compact = false,
                                              }: Props) => {
    if (!notifications.length) {
        return (
            <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-7 text-center text-sm text-[var(--color-text-muted)]">
                {locale.noData}
            </div>
        );
    }

    const visibleItems = compact ? notifications.slice(0, 4) : notifications;

    return (
        <section className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-warning)]">
                        NASA ALERT CONSOLE
                    </p>

                    <h2 className="mt-1 text-lg font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                        Latest Alerts
                    </h2>
                </div>

                <p className="text-xs text-[var(--color-text-muted)]">
                    {visibleItems.length} {locale.notifications}
                </p>
            </div>

            <div className={compact ? "grid gap-3" : "grid gap-4 lg:grid-cols-2"}>
                {visibleItems.map((item, index) => (
                    <motion.article
                        key={`${item.id}-${index}`}
                        initial={{opacity: 0, y: 14}}
                        whileInView={{opacity: 1, y: 0}}
                        whileHover={{y: -4}}
                        viewport={{once: true}}
                        transition={{duration: 0.32, delay: Math.min(index * 0.035, 0.2)}}
                        className="relative overflow-hidden rounded-[1.25rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-glass),rgba(15,23,42,0.12))] p-4 backdrop-blur-xl"
                    >
                        <div className="absolute right-[-40px] top-[-40px] h-28 w-28 rounded-full bg-[var(--color-warning)]/12 blur-2xl" />

                        <div className="relative z-10">
                            <div className="flex items-start gap-3">
                                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--color-warning)]/25 bg-[var(--color-warning)]/10 text-[var(--color-warning)]">
                                    <ShieldAlert className="h-4 w-4" />
                                </div>

                                <div className="min-w-0">
                                    <p className="inline-flex rounded-full border border-[var(--color-warning)]/35 bg-[var(--color-warning)]/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-warning)]">
                                        {item.type}
                                    </p>

                                    <h3 className="mt-2 line-clamp-2 text-base font-black tracking-[-0.035em] text-[var(--color-text)]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                                        {locale.issueTime}: {item.issueTime ?? "—"}
                                    </p>
                                </div>
                            </div>

                            <p className={`${compact ? "line-clamp-4" : "line-clamp-7"} mt-3 whitespace-pre-line text-xs leading-5 text-[var(--color-text-muted)]`}>
                                {item.body}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                                    <MessageSquareWarning className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                                    DONKI
                                </div>

                                {item.url && (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-3.5 py-2 text-[10px] font-black text-white transition hover:gap-3"
                                    >
                                        {locale.source}
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
};