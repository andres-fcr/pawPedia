import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;

    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;

    return currentPage - 2 + i;
  });

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {currentPage > 3 && totalPages > 5 && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            className="bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            1
          </Button>
          <span className="text-slate-500">...</span>
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
          className={
            currentPage === page
              ? "bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-white"
              : "bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          }
        >
          {page}
        </Button>
      ))}

      {currentPage < totalPages - 2 && totalPages > 5 && (
        <>
          <span className="text-slate-500">...</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            className="bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="bg-white dark:bg-slate-800 border-amber-200 dark:border-slate-700 hover:bg-amber-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// export const PaginationContent = () => null
// export const PaginationItem = () => null
// export const PaginationLink = () => null
// export const PaginationEllipsis = () => null
// export const PaginationPrevious = () => null
// export const PaginationNext = () => null
