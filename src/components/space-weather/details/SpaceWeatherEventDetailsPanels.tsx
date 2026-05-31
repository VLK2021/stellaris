"use client";

import {useMemo, useState} from "react";
import {motion} from "framer-motion";
import {
    Braces,
    ExternalLink,
    GitBranch,
    RadioTower,
    Route,
    Satellite,
} from "lucide-react";

import type {SpaceWeatherEventDetails} from "@/src/types/space-weather/spaceWeatherEventDetails.types";
import type {SpaceWeatherEvent} from "@/src/types/space-weather/spaceWeather.types";
import type {SpaceWeatherLocale} from "@/src/types/space-weather/spaceWeatherUi.types";

type Props = {
    locale: SpaceWeatherLocale;
    details: SpaceWeatherEventDetails;
};

type Tab = "overview" | "linked" | "raw";

export const SpaceWeatherEventDetailsPanels = ({locale, details}: Props) => {
    const [tab, setTab] = useState<Tab>("overview");

    const rawEntries = useMemo(() => {
        if (!details.raw) return [];

        return Object.entries(details.raw).filter(([, value]) => {
            return value !== null && value !== undefined && value !== "";
        });
    }, [details.raw]);

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,var(--color-accent-soft),transparent_28%),radial-gradient(circle_at_82%_72%,rgba(234,88,12,0.12),transparent_34%)]" />

            <motion.div
                className="absolute left-[-28%] top-[18%] h-[2px] w-[72%] rotate-[-12deg] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent blur-[1px]"
                animate={{x: ["0%", "180%"], opacity: [0, 0.55, 0]}}
                transition={{duration: 6.2, repeat: Infinity, ease: "easeInOut"}}
            />

            <div className="relative z-10 mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--color-accent)]">
                        EVENT COMMAND DATA
                    </p>

                    <h2 className="mt-1 text-xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                        NASA DONKI Transmission
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                    <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>
                        {locale.overviewTab}
                    </TabButton>

                    <TabButton active={tab === "linked"} onClick={() => setTab("linked")}>
                        {locale.linkedTab}
                    </TabButton>

                    <TabButton active={tab === "raw"} onClick={() => setTab("raw")}>
                        {locale.rawTab}
                    </TabButton>
                </div>
            </div>

            <div className="relative z-10">
                {tab === "overview" && (
                    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                        <EventParametersPanel
                            locale={locale}
                            details={details}
                            rawEntries={rawEntries}
                        />

                        <div className="grid content-start gap-5">
                            <InstrumentsPanel locale={locale} event={details.event} />
                            <EventTimelinePanel event={details.event} />
                        </div>
                    </div>
                )}

                {tab === "linked" && (
                    <LinkedEventsPanel locale={locale} events={details.relatedEvents} />
                )}

                {tab === "raw" && <RawDataPanel raw={details.raw} />}
            </div>
        </section>
    );
};

const TabButton = ({
                       active,
                       onClick,
                       children,
                   }: {
    active: boolean;
    onClick: () => void;
    children: string;
}) => (
    <button
        type="button"
        onClick={onClick}
        className={`rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] transition ${
            active
                ? "bg-[var(--color-accent)] text-white shadow-[var(--shadow-glow)]"
                : "border border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
        }`}
    >
        {children}
    </button>
);

const EventParametersPanel = ({
                                  locale,
                                  details,
                                  rawEntries,
                              }: {
    locale: SpaceWeatherLocale;
    details: SpaceWeatherEventDetails;
    rawEntries: [string, unknown][];
}) => {
    const {event} = details;

    const normalizedRows = [
        ["Event ID", event.id],
        ["Type", event.type],
        [locale.speed, event.speed ? `${event.speed} km/s` : "—"],
        [locale.halfAngle, event.halfAngle ? `${event.halfAngle}°` : "—"],
        ["Latitude", event.latitude ?? "—"],
        ["Longitude", event.longitude ?? "—"],
        [locale.classType, event.classType ?? "—"],
        [locale.kpIndex, event.kpIndex ?? "—"],
        [locale.sourceLocation, event.sourceLocation || "—"],
        [locale.activeRegion, event.activeRegionNum ?? "—"],
        [locale.catalog, event.catalog || "—"],
    ];

    const extraRows = rawEntries
        .filter(([key]) => {
            return ![
                "link",
                "linkedEvents",
                "instruments",
                "cmeAnalyses",
                "impactList",
                "cmeInputs",
            ].includes(key);
        })
        .slice(0, 14);

    return (
        <motion.article
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.35}}
            className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-glass),rgba(15,23,42,0.12))] p-4 backdrop-blur-xl sm:p-5"
        >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:54px_54px] opacity-50" />
            <div className="absolute right-[-70px] top-[-70px] h-40 w-40 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />

            <PanelHeader
                icon={Route}
                eyebrow={locale.eventParameters}
                title={locale.normalizedDossier}
            />

            <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2">
                {normalizedRows.map(([label, value]) => (
                    <ParameterTile
                        key={String(label)}
                        label={String(label)}
                        value={String(value)}
                    />
                ))}
            </div>

            {!!extraRows.length && (
                <>
                    <h3 className="relative z-10 mt-6 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-warning)]">
                        {locale.additionalFields}
                    </h3>

                    <div className="relative z-10 mt-3 grid gap-3 sm:grid-cols-2">
                        {extraRows.map(([label, value]) => (
                            <ParameterTile
                                key={label}
                                label={label}
                                value={formatRawValue(value)}
                            />
                        ))}
                    </div>
                </>
            )}
        </motion.article>
    );
};

const InstrumentsPanel = ({
                              locale,
                              event,
                          }: {
    locale: SpaceWeatherLocale;
    event: SpaceWeatherEvent;
}) => (
    <motion.article
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.35}}
        className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-glass),rgba(15,23,42,0.12))] p-4 backdrop-blur-xl sm:p-5"
    >
        <div className="absolute right-[-52px] top-[-52px] h-32 w-32 rounded-full bg-[var(--color-accent-soft)] blur-3xl" />

        <PanelHeader
            icon={Satellite}
            eyebrow={locale.instruments}
            title={locale.observationSources}
        />

        {event.instruments.length ? (
            <div className="relative z-10 mt-5 grid gap-2">
                {event.instruments.map((item, index) => (
                    <motion.div
                        key={`${item}-${index}`}
                        initial={{opacity: 0, x: 14}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.3, delay: index * 0.04}}
                        className="flex items-center justify-between rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-3"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                            {item}
                        </span>

                        <span className="h-2 w-2 rounded-full bg-[var(--color-success)] shadow-[0_0_18px_var(--color-success)]" />
                    </motion.div>
                ))}
            </div>
        ) : (
            <p className="relative z-10 mt-5 text-sm text-[var(--color-text-muted)]">
                {locale.noData}
            </p>
        )}
    </motion.article>
);

const EventTimelinePanel = ({event}: {event: SpaceWeatherEvent}) => {
    const points = [
        {
            label: "Start",
            value: event.startTime,
        },
        {
            label: "End",
            value: event.endTime,
        },
        {
            label: "NASA Link",
            value: event.link ? "Available" : null,
        },
    ].filter((item) => item.value);

    return (
        <motion.article
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.35}}
            className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-glass),rgba(15,23,42,0.12))] p-4 backdrop-blur-xl sm:p-5"
        >
            <PanelHeader
                icon={RadioTower}
                eyebrow="EVENT TIMELINE"
                title="Signal path"
            />

            <div className="relative z-10 mt-6">
                <div className="relative h-[220px] rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5">
                    <div className="absolute left-8 top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-[var(--color-warning)] via-[var(--color-accent)] to-transparent" />

                    <div className="grid gap-6">
                        {points.map((point, index) => (
                            <div key={point.label} className="relative pl-10">
                                <motion.div
                                    className="absolute left-[21px] top-1 h-3.5 w-3.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_20px_var(--color-accent)]"
                                    animate={{scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65]}}
                                    transition={{
                                        duration: 1.8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.25,
                                    }}
                                />

                                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                                    {point.label}
                                </p>

                                <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                    {point.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {event.link && (
                <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="relative z-10 mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)] transition hover:border-[var(--color-border-strong)]"
                >
                    NASA source
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            )}
        </motion.article>
    );
};

const LinkedEventsPanel = ({
                               locale,
                               events,
                           }: {
    locale: SpaceWeatherLocale;
    events: SpaceWeatherEvent[];
}) => (
    <motion.article
        initial={{opacity: 0, y: 16}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.35}}
        className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-glass),rgba(15,23,42,0.12))] p-4 backdrop-blur-xl sm:p-5"
    >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />

        <PanelHeader
            icon={GitBranch}
            eyebrow={locale.linkedEvents}
            title={locale.linkedEventGraph}
        />

        {events.length ? (
            <div className="relative z-10 mt-6">
                <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-warning)] to-transparent lg:block" />

                <div className="grid gap-4 lg:grid-cols-2">
                    {events.map((event, index) => (
                        <motion.div
                            key={`${event.id}-${event.type}-${index}`}
                            initial={{opacity: 0, y: 14}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.3, delay: index * 0.04}}
                            className="relative rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
                        >
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-accent)]">
                                {event.type}
                            </p>

                            <h3 className="mt-2 text-base font-black text-[var(--color-text)]">
                                {event.title}
                            </h3>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {event.startTime ?? "—"}
                            </p>

                            {event.link && (
                                <a
                                    href={event.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[var(--color-accent)]"
                                >
                                    NASA source
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        ) : (
            <p className="relative z-10 mt-5 text-sm text-[var(--color-text-muted)]">
                {locale.noData}
            </p>
        )}
    </motion.article>
);

const RawDataPanel = ({raw}: {raw: unknown}) => (
    <motion.article
        initial={{opacity: 0, y: 16}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.35}}
        className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[linear-gradient(135deg,var(--color-glass),rgba(15,23,42,0.12))] p-4 backdrop-blur-xl sm:p-5"
    >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:56px_56px] opacity-50" />

        <PanelHeader
            icon={Braces}
            eyebrow="RAW NASA PAYLOAD"
            title="Original DONKI response"
        />

        <pre className="relative z-10 mt-5 max-h-[620px] overflow-auto rounded-[1.2rem] border border-[var(--color-border)] bg-black/35 p-4 text-xs leading-6 text-[var(--color-text-muted)]">
            {JSON.stringify(raw, null, 2)}
        </pre>
    </motion.article>
);

const PanelHeader = ({
                         icon: Icon,
                         eyebrow,
                         title,
                     }: {
    icon: typeof Route;
    eyebrow: string;
    title: string;
}) => (
    <div className="relative z-10 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <Icon className="h-4 w-4" />
        </div>

        <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                {eyebrow}
            </p>

            <h2 className="mt-1 text-lg font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                {title}
            </h2>
        </div>
    </div>
);

const ParameterTile = ({
                           label,
                           value,
                       }: {
    label: string;
    value: string;
}) => (
    <div className="relative overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-3">
        <div className="absolute right-[-28px] top-[-28px] h-20 w-20 rounded-full bg-[var(--color-accent-soft)] blur-2xl" />

        <p className="relative z-10 text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {label}
        </p>

        <p className="relative z-10 mt-1 break-words text-xs font-bold text-[var(--color-text)]">
            {value}
        </p>
    </div>
);

const formatRawValue = (value: unknown) => {
    if (Array.isArray(value)) {
        return `${value.length} items`;
    }

    if (typeof value === "object" && value !== null) {
        return "Object";
    }

    return String(value);
};