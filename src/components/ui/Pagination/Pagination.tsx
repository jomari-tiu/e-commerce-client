import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '../@raw-shadcn/pagination';

export type PaginationProps = {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;
  /**
   * Total number of pages
   */
  totalPages: number;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Number of page buttons to show before/after current page
   * @default 1
   */
  siblingCount?: number;
  /**
   * Whether to show Previous/Next buttons
   * @default true
   */
  showPreviousNext?: boolean;
  /**
   * Whether to show first/last page buttons
   * @default false
   */
  showFirstLast?: boolean;
  /**
   * Size of the pagination buttons
   * @default "default"
   */
  size?: 'sm' | 'default' | 'lg';
  /**
   * Additional className for the pagination container
   */
  className?: string;
  /**
   * Disable pagination controls
   * @default false
   */
  disabled?: boolean;
};

const ELLIPSIS = -1;

/**
 * Generates the range of page numbers to display in pagination
 */
const generatePaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | typeof ELLIPSIS)[] => {
  const totalNumbers = siblingCount * 2 + 3; // siblings + current + first + last
  const totalBlocks = totalNumbers + 2; // + 2 ellipsis

  if (totalPages <= totalBlocks) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    return [...leftRange, ELLIPSIS, totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1
    );
    return [1, ELLIPSIS, ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [1, ELLIPSIS, ...middleRange, ELLIPSIS, totalPages];
  }

  return [];
};

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showPreviousNext = true,
      showFirstLast = false,
      size = 'default',
      className,
      disabled = false,
    },
    ref
  ) => {
    const paginationRange = React.useMemo(
      () => generatePaginationRange(currentPage, totalPages, siblingCount),
      [currentPage, totalPages, siblingCount]
    );

    const handlePageChange = (page: number) => {
      if (disabled) return;
      if (page < 1 || page > totalPages) return;
      if (page === currentPage) return;
      onPageChange(page);
    };

    const handlePrevious = () => {
      handlePageChange(currentPage - 1);
    };

    const handleNext = () => {
      handlePageChange(currentPage + 1);
    };

    if (totalPages <= 0) {
      return null;
    }

    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      default: 'h-9 w-9 text-sm',
      lg: 'h-10 w-10 text-base',
    };

    const buttonSize = sizeClasses[size];

    return (
      <ShadPagination ref={ref as any} className={cn(className)}>
        <PaginationContent>
          {showPreviousNext && (
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevious();
                }}
                className={cn(
                  'gap-1 pl-2.5',
                  (currentPage === 1 || disabled) &&
                    'pointer-events-none opacity-50 cursor-not-allowed'
                )}
                aria-label="Go to previous page"
                aria-disabled={currentPage === 1 || disabled}
                size="default"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </PaginationLink>
            </PaginationItem>
          )}

          {showFirstLast && currentPage > siblingCount + 2 && (
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
                className={cn(buttonSize, disabled && 'pointer-events-none opacity-50')}
                aria-disabled={disabled}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}

          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === ELLIPSIS) {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis className={buttonSize} />
                </PaginationItem>
              );
            }

            const isActive = pageNumber === currentPage;

            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(pageNumber);
                  }}
                  isActive={isActive}
                  className={cn(
                    buttonSize,
                    disabled && 'pointer-events-none opacity-50',
                    isActive && 'border-primary bg-primary/10 font-semibold'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  aria-disabled={disabled}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {showFirstLast && currentPage < totalPages - siblingCount - 1 && (
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
                className={cn(buttonSize, disabled && 'pointer-events-none opacity-50')}
                aria-disabled={disabled}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          {showPreviousNext && (
            <PaginationItem>
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className={cn(
                  'gap-1 pr-2.5',
                  (currentPage === totalPages || disabled) &&
                    'pointer-events-none opacity-50 cursor-not-allowed'
                )}
                aria-label="Go to next page"
                aria-disabled={currentPage === totalPages || disabled}
                size="default"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </PaginationItem>
          )}
        </PaginationContent>
      </ShadPagination>
    );
  }
);

Pagination.displayName = 'Pagination';

