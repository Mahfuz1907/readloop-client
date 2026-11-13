"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryTypes } from "@/lib/type";
import { PAGE_RANGE_OPTIONS } from "@/lib/bookFilters";
import { useBookFilterParams } from "@/hooks/useBookFilterParams";
import { FilterX, Search, X } from "lucide-react";

type BookFiltersProps = {
  categories: CategoryTypes[];
  years: number[];
  totalBooks: number;
  resultCount: number;
};

export default function BookFilters({
  categories,
  years,
  totalBooks,
  resultCount,
}: BookFiltersProps) {
  const {
    searchQuery,
    setSearchQuery,
    categoryName,
    publishedYear,
    pages,
    setParam,
    clearFilters,
    hasFilters,
    activeFilters,
  } = useBookFilterParams();

  // Base UI resolves the trigger label from these items, so the closed selects
  // read "All categories" instead of the raw "all" value.
  const categoryItems = [
    { value: "all", label: "All categories" },
    ...categories.map((category) => ({
      value: category.categoryName,
      label: category.categoryName,
    })),
  ];

  const yearItems = [
    { value: "all", label: "All years" },
    ...years.map((year) => ({ value: String(year), label: String(year) })),
  ];

  const pageItems = [
    { value: "all", label: "Any length" },
    ...PAGE_RANGE_OPTIONS.map((option) => ({
      value: option.value,
      label: option.label,
    })),
  ];

  return (
    <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)_9rem_11rem_auto]">
        <div className="relative min-w-0 sm:col-span-2 xl:col-span-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search by title, author, or description..."
            className="h-10 border-slate-800 bg-slate-900 pl-9 text-xs text-white focus-visible:ring-emerald-600 sm:text-sm"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <Select
          items={categoryItems}
          value={categoryName || "all"}
          onValueChange={(value) =>
            setParam("categoryName", value === "all" ? "" : (value ?? ""))
          }
        >
          <SelectTrigger className="h-10 w-full border-slate-800 bg-slate-900 text-xs text-slate-200 focus-visible:ring-emerald-600 sm:text-sm">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent className="border-slate-800 bg-slate-950 text-white">
            <SelectItem
              value="all"
              className="focus:bg-emerald-950 focus:text-emerald-400"
            >
              All categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category._id}
                value={category.categoryName}
                className="focus:bg-emerald-950 focus:text-emerald-400"
              >
                {category.categoryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={yearItems}
          value={publishedYear || "all"}
          onValueChange={(value) =>
            setParam("publishedYear", value === "all" ? "" : (value ?? ""))
          }
        >
          <SelectTrigger className="h-10 w-full border-slate-800 bg-slate-900 text-xs text-slate-200 focus-visible:ring-emerald-600 sm:text-sm">
            <SelectValue placeholder="All years" />
          </SelectTrigger>
          <SelectContent className="border-slate-800 bg-slate-950 text-white">
            <SelectItem
              value="all"
              className="focus:bg-emerald-950 focus:text-emerald-400"
            >
              All years
            </SelectItem>
            {years.map((year) => (
              <SelectItem
                key={year}
                value={String(year)}
                className="focus:bg-emerald-950 focus:text-emerald-400"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          items={pageItems}
          value={pages || "all"}
          onValueChange={(value) =>
            setParam("pages", value === "all" ? "" : (value ?? ""))
          }
        >
          <SelectTrigger className="h-10 w-full border-slate-800 bg-slate-900 text-xs text-slate-200 focus-visible:ring-emerald-600 sm:text-sm">
            <SelectValue placeholder="Any length" />
          </SelectTrigger>
          <SelectContent className="border-slate-800 bg-slate-950 text-white">
            <SelectItem
              value="all"
              className="focus:bg-emerald-950 focus:text-emerald-400"
            >
              Any length
            </SelectItem>
            {PAGE_RANGE_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="focus:bg-emerald-950 focus:text-emerald-400"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="button"
          variant="outline"
          onClick={clearFilters}
          disabled={!hasFilters}
          className="h-10 gap-2 border-slate-700 bg-slate-900 text-xs text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 sm:col-span-2 xl:col-span-1"
        >
          <FilterX className="h-4 w-4" />
          Clear
        </Button>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-800/70 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {activeFilters.length > 0 ? (
            activeFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant="outline"
                className="h-6 gap-1 border-slate-700 bg-slate-900/80 text-[11px] text-slate-300"
              >
                <span className="max-w-48 truncate">{filter.label}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (filter.key === "search") setSearchQuery("");
                    setParam(filter.key, "");
                  }}
                  aria-label={`Remove ${filter.label} filter`}
                  className="rounded-full p-0.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            <span className="text-xs text-slate-500">
              Showing the complete catalog
            </span>
          )}
        </div>

        <p className="shrink-0 text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-emerald-400">{resultCount}</span>{" "}
          of {totalBooks} books
        </p>
      </div>
    </div>
  );
}
