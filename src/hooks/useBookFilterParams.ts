"use client";

import { getPageRangeLabel, isPageRange } from "@/lib/bookFilters";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SEARCH_DEBOUNCE_MS = 300;

export type ActiveBookFilter = {
  key: "search" | "categoryName" | "publishedYear" | "pages";
  label: string;
};

/**
 * Keeps the book filter controls in sync with the URL. Every control writes
 * straight to the query string, and the search input is debounced so typing
 * does not trigger a request per keystroke.
 */
export function useBookFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchFromUrl = searchParams.get("search") ?? "";
  const categoryName = searchParams.get("categoryName") ?? "";
  const publishedYear = searchParams.get("publishedYear") ?? "";
  const rawPages = searchParams.get("pages") ?? "";
  const pages = isPageRange(rawPages) ? rawPages : "";

  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  // Keep track of what this component wrote so back/forward navigation can
  // update the input without overwriting text that is still being typed.
  const lastPushed = useRef(searchFromUrl);

  useEffect(() => {
    if (searchFromUrl !== lastPushed.current) {
      lastPushed.current = searchFromUrl;
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // If the user changes a select while the search debounce is still pending,
    // keep the text they have already typed.
    if (key !== "search" && searchQuery) {
      params.set("search", searchQuery);
    }

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }

      const nextQuery = params.toString();
      if (nextQuery === searchParams.toString()) return;

      lastPushed.current = searchQuery;
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchQuery, searchParams, pathname, router]);

  const clearFilters = () => {
    setSearchQuery("");
    lastPushed.current = "";
    router.replace(pathname, { scroll: false });
  };

  const hasFilters = Boolean(
    searchQuery || categoryName || publishedYear || pages,
  );

  const activeFilters: ActiveBookFilter[] = [
    searchQuery ? { key: "search", label: `Search: ${searchQuery}` } : null,
    categoryName
      ? { key: "categoryName", label: `Category: ${categoryName}` }
      : null,
    publishedYear
      ? { key: "publishedYear", label: `Year: ${publishedYear}` }
      : null,
    pages ? { key: "pages", label: `Pages: ${getPageRangeLabel(pages)}` } : null,
  ].filter((filter): filter is ActiveBookFilter => filter !== null);

  return {
    searchQuery,
    setSearchQuery,
    categoryName,
    publishedYear,
    pages,
    setParam,
    clearFilters,
    hasFilters,
    activeFilters,
  };
}
