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
        <section className="grid gap-5">
            <div className="flex flex-wrap gap-2 border-b border-[var(--color-border)] pb-3">
                <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>
                    Overview
                </TabButton>

                <TabButton active={tab === "linked"} onClick={() => setTab("linked")}>
                    Linked Events
                </TabButton>

                <TabButton active={tab === "raw"} onClick={() => setTab("raw")}>
                    Raw NASA
                </TabButton>
            </div>

            {tab === "overview" && (
                <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
                    <EventParametersPanel
                        locale={locale}
                        details={details}
                        rawEntries={rawEntries}
                    />

                    <div className="grid content-start gap-5">
                        <InstrumentsPanel
                            locale={locale}
                            event={details.event}
                        />

                        <EventTimelinePanel
                            event={details.event}
                        />
                    </div>
                </div>
            )}

            {tab === "linked" && (
                <LinkedEventsPanel
                    locale={locale}
                    events={details.relatedEvents}
                />
            )}

            {tab === "raw" && (
                <RawDataPanel
                    raw={details.raw}
                />
            )}
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
                : "border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-text-muted)] hover:border-[var(--color-border-strong)]"
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
            className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5"
        >
            <PanelHeader
                icon={Route}
                eyebrow="EVENT PARAMETERS"
                title="NASA normalized dossier"
            />

            <div className="mt-5 overflow-hidden rounded-[1.2rem] border border-[var(--color-border)]">
                <div className="grid md:grid-cols-2">
                    {normalizedRows.map(([label, value]) => (
                        <ParameterRow
                            key={String(label)}
                            label={String(label)}
                            value={String(value)}
                        />
                    ))}
                </div>
            </div>

            {!!extraRows.length && (
                <>
                    <h3 className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--color-accent)]">
                        Additional NASA fields
                    </h3>

                    <div className="mt-3 overflow-hidden rounded-[1.2rem] border border-[var(--color-border)]">
                        <div className="grid md:grid-cols-2">
                            {extraRows.map(([label, value]) => (
                                <ParameterRow
                                    key={label}
                                    label={label}
                                    value={formatRawValue(value)}
                                />
                            ))}
                        </div>
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
        className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5"
    >
        <PanelHeader
            icon={Satellite}
            eyebrow={locale.instruments}
            title="Observation sources"
        />

        {event.instruments.length ? (
            <div className="mt-5 flex flex-wrap gap-2.5">
                {event.instruments.map((item) => (
                    <span
                        key={item}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]"
                    >
                        {item}
                    </span>
                ))}
            </div>
        ) : (
            <p className="mt-5 text-sm text-[var(--color-text-muted)]">
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
            className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5"
        >
            <PanelHeader
                icon={RadioTower}
                eyebrow="EVENT TIMELINE"
                title="Recorded moments"
            />

            <div className="mt-6">
                <div className="relative h-2 rounded-full bg-[var(--color-glass)]">
                    <motion.div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[var(--color-warning)] via-[var(--color-accent)] to-[var(--color-plasma)]"
                        initial={{width: 0}}
                        whileInView={{width: "100%"}}
                        viewport={{once: true}}
                        transition={{duration: 0.8}}
                    />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {points.map((point) => (
                        <div key={point.label}>
                            <div className="h-3 w-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_20px_var(--color-accent)]" />

                            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                                {point.label}
                            </p>

                            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                                {point.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {event.link && (
                <a
                    href={event.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-accent)] transition hover:border-[var(--color-border-strong)]"
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
        className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5"
    >
        <PanelHeader
            icon={GitBranch}
            eyebrow={locale.linkedEvents}
            title="DONKI related event graph"
        />

        {events.length ? (
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
                {events.map((event, index) => (
                    <div
                        key={`${event.id}-${event.type}-${index}`}
                        className="rounded-[1.2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4"
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
                    </div>
                ))}
            </div>
        ) : (
            <p className="mt-5 text-sm text-[var(--color-text-muted)]">
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
        className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-[var(--shadow-card)] backdrop-blur-2xl sm:p-5"
    >
        <PanelHeader
            icon={Braces}
            eyebrow="RAW NASA PAYLOAD"
            title="Original DONKI response"
        />

        <pre className="mt-5 max-h-[620px] overflow-auto rounded-[1.2rem] border border-[var(--color-border)] bg-black/35 p-4 text-xs leading-6 text-[var(--color-text-muted)]">
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

const ParameterRow = ({
                          label,
                          value,
                      }: {
    label: string;
    value: string;
}) => (
    <div className="grid grid-cols-[0.85fr_1.15fr] border-b border-r border-[var(--color-border)] last:border-b-0">
        <div className="bg-[var(--color-glass)] px-4 py-3 text-xs text-[var(--color-text-muted)]">
            {label}
        </div>

        <div className="px-4 py-3 text-xs font-bold text-[var(--color-text)]">
            {value}
        </div>
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