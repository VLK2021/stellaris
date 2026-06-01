import type {ReactNode} from "react";

type Props = {
    title: string;
    children: ReactNode;
};

export const EarthPanel = ({title, children}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />

            <h2 className="relative z-10 mb-4 text-xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                {title}
            </h2>

            <div className="relative z-10">{children}</div>
        </section>
    );
};