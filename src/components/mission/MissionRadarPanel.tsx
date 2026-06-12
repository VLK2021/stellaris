import {Activity, Sparkles} from "lucide-react";

type Props = {
    wiki: string;
    nasaMedia: string;
    normalized: string;
    online: string;
    pipeline: string;
    sourceLabels: {
        summary: string;
        media: string;
        data: string;
        signal: string;
    };
};

export const MissionRadarPanel = ({
                                      wiki,
                                      nasaMedia,
                                      normalized,
                                      online,
                                      pipeline,
                                      sourceLabels,
                                  }: Props) => {
    return (
        <div className="relative min-h-[330px] overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-5 backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-accent-soft),transparent_30%),radial-gradient(circle_at_80%_15%,var(--color-glass-strong),transparent_34%)]" />

            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--color-border-strong)]" />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[var(--color-border)]" />

            <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-[var(--shadow-glow)]">
                <Activity className="h-9 w-9 text-[var(--color-accent)]" />
            </div>

            <RadarNode className="left-5 top-5" label={wiki} value={sourceLabels.summary} />
            <RadarNode className="right-5 top-12" label="NASA" value={nasaMedia} />
            <RadarNode className="bottom-5 left-7" label={sourceLabels.data} value={normalized} />
            <RadarNode className="bottom-10 right-8" label={sourceLabels.signal} value={online} />

            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-accent)] backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                {pipeline}
            </div>
        </div>
    );
};

const RadarNode = ({
                       className,
                       label,
                       value,
                   }: {
    className: string;
    label: string;
    value: string;
}) => (
    <div className={`absolute rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-4 py-3 backdrop-blur-xl ${className}`}>
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
            {label}
        </p>

        <p className="mt-1 bg-gradient-to-r from-[var(--color-text)] via-[var(--color-accent)] to-[var(--color-brand-secondary)] bg-clip-text text-sm font-black text-transparent">
            {value}
        </p>
    </div>
);