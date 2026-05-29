"use client";

import {ChevronLeft, ChevronRight} from "lucide-react";

import type {PaginationProps} from "@/src/types/common/pagination.types";

import {PaginationButton} from "./PaginationButton";
import {PaginationInfo} from "./PaginationInfo";

const buildPages = (
    currentPage: number,
    totalPages: number,
    siblingCount = 1,
) => {
    const pages: (number | string)[] = [];

    const left = Math.max(1, currentPage - siblingCount);
    const right = Math.min(totalPages, currentPage + siblingCount);

    if (left > 1) {
        pages.push(1);

        if (left > 2) {
            pages.push("...");
        }
    }

    for (let page = left; page <= right; page++) {
        pages.push(page);
    }

    if (right < totalPages) {
        if (right < totalPages - 1) {
            pages.push("...");
        }

        pages.push(totalPages);
    }

    return pages;
};

export const Pagination = ({
                               currentPage,
                               totalPages,
                               onPageChange,
                               siblingCount = 1,
                               showInfo = true,
                               isLoading = false,
                           }: PaginationProps) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = buildPages(
        currentPage,
        totalPages,
        siblingCount,
    );

    return (
        <div className="mt-8 flex flex-col items-center gap-4">
            <div className="hidden items-center gap-2 md:flex">
                <PaginationButton
                    disabled={currentPage === 1 || isLoading}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft size={18} />
                </PaginationButton>

                {pages.map((page, index) =>
                    page === "..." ? (
                        <div
                            key={`ellipsis-${index}`}
                            className="px-2 text-[var(--color-text-muted)]"
                        >
                            ...
                        </div>
                    ) : (
                        <PaginationButton
                            key={page}
                            active={page === currentPage}
                            disabled={isLoading}
                            onClick={() => onPageChange(Number(page))}
                        >
                            {page}
                        </PaginationButton>
                    ),
                )}

                <PaginationButton
                    disabled={
                        currentPage === totalPages ||
                        isLoading
                    }
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight size={18} />
                </PaginationButton>
            </div>

            <div className="flex items-center gap-4 md:hidden">
                <PaginationButton
                    disabled={currentPage === 1 || isLoading}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft size={18} />
                </PaginationButton>

                <PaginationInfo
                    currentPage={currentPage}
                    totalPages={totalPages}
                />

                <PaginationButton
                    disabled={
                        currentPage === totalPages ||
                        isLoading
                    }
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight size={18} />
                </PaginationButton>
            </div>

            {showInfo && (
                <div className="text-xs text-[var(--color-text-soft)]">
                    Page {currentPage} of {totalPages}
                </div>
            )}
        </div>
    );
};