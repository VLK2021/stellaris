import type {ReactNode} from "react";

type Props = {
    title: string;
    children: ReactNode;
};

export const EarthPanel = ({title, children}: Props) => {
    return (
        <section className="relative overflow-hidden rounded-[1.7rem] border border-[var(--color-border)] bg-[linear-gradient(145deg,var(--color-card),rgba(34,197,94,0.05),rgba(14,165,233,0.04))] p-5 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(34,197,94,0.08),transparent_32%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.08),transparent_30%)]" />

            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent" />

            <h2 className="relative z-10 mb-4 text-xl font-black uppercase tracking-[-0.04em] text-[var(--color-text)]">
                {title}
            </h2>

            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
};