export const MissionSpaceBackground = () => {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{background: "var(--hero-bg)"}}
            />

            <div className="absolute left-1/2 top-1/2 h-[88rem] w-[88rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_90deg,var(--color-accent-soft),var(--color-glass),var(--color-card-deep),var(--color-accent-soft))] opacity-70 blur-3xl" />

            <div className="absolute left-[-18rem] top-[5rem] h-[46rem] w-[46rem] rounded-full bg-[var(--color-accent-soft)] blur-3xl" />

            <div className="absolute right-[-18rem] top-[7rem] h-[48rem] w-[48rem] rounded-full bg-[var(--color-glass)] blur-3xl" />

            <div className="absolute bottom-[-24rem] left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-[var(--color-card-deep)] blur-3xl" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,var(--color-accent-soft),transparent_22%),radial-gradient(circle_at_82%_18%,var(--color-glass-strong),transparent_24%),radial-gradient(circle_at_50%_74%,var(--color-card-deep),transparent_30%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

            <div className="absolute inset-0 opacity-60">
                {Array.from({length: 42}).map((_, index) => (
                    <span
                        key={index}
                        className="absolute h-1 w-1 rounded-full bg-[var(--color-accent)] shadow-[var(--shadow-glow)]"
                        style={{
                            left: `${(index * 19) % 100}%`,
                            top: `${(index * 31) % 100}%`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};