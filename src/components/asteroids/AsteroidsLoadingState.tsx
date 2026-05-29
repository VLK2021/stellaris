export const AsteroidsLoadingState = () => {
    return (
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                    key={item}
                    className="h-[360px] animate-pulse rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)]"
                />
            ))}
        </div>
    );
};