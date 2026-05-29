export const AsteroidDetailsLoadingState = () => {
    return (
        <div className="grid gap-5">
            <div className="h-[420px] animate-pulse rounded-[1.9rem] border border-[var(--color-border)] bg-[var(--color-card)]" />

            <div className="grid gap-5 xl:grid-cols-2">
                <div className="h-[260px] animate-pulse rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)]" />
                <div className="h-[260px] animate-pulse rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)]" />
            </div>

            <div className="h-[320px] animate-pulse rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)]" />
        </div>
    );
};