type Props = {
    currentPage: number;
    totalPages: number;
};

export const PaginationInfo = ({
                                   currentPage,
                                   totalPages,
                               }: Props) => {
    return (
        <div className="text-sm text-[var(--color-text-muted)]">
            {currentPage} / {totalPages}
        </div>
    );
};