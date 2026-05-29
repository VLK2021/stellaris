export type PaginationMeta = {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;

    siblingCount?: number;
    showInfo?: boolean;
    isLoading?: boolean;
};