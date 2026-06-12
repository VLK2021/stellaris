import {ArrowRight, Layers3} from "lucide-react";

type Props = {
    title: string;
    steps: string[];
};

export const MissionPipeline = ({title, steps}: Props) => {
    return (
        <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-glass)] p-4 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
                <Layers3 className="h-5 w-5 text-[var(--color-accent)]" />

                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    {title}
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {steps.map((item, index) => (
                    <div
                        key={item}
                        className="flex items-center gap-2"
                    >
                        <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-glass-strong)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--color-text)]">
                            {item}
                        </span>

                        {index < steps.length - 1 && (
                            <ArrowRight className="h-3.5 w-3.5 text-[var(--color-text-soft)]" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};