export const ApodLoadingState = ({locale}: {locale: {loading: string}}) => {
    return (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="h-[360px] animate-pulse rounded-[1.65rem] border border-white/10 bg-white/[0.035]"
                />
            ))}

            <p className="sr-only">{locale.loading}</p>
        </div>
    );
};