import { BooksTypes } from "@/lib/type";

export const PAGE_RANGE_OPTIONS = [
  { value: "under-300", label: "Under 300 pages" },
  { value: "300-499", label: "300 – 499 pages" },
  { value: "500-799", label: "500 – 799 pages" },
  { value: "800-plus", label: "800+ pages" },
] as const;

export type PageRange = (typeof PAGE_RANGE_OPTIONS)[number]["value"];

export type BookFilterValues = {
  search: string;
  categoryName: string;
  publishedYear: string;
  pages: string;
};

export const isPageRange = (value: string): value is PageRange =>
  PAGE_RANGE_OPTIONS.some((option) => option.value === value);

export const getPageRangeLabel = (value: string) =>
  PAGE_RANGE_OPTIONS.find((option) => option.value === value)?.label ?? value;

export const matchesPageRange = (pages: number, range: string) => {
  switch (range) {
    case "under-300":
      return pages < 300;
    case "300-499":
      return pages >= 300 && pages < 500;
    case "500-799":
      return pages >= 500 && pages < 800;
    case "800-plus":
      return pages >= 800;
    default:
      return true;
  }
};

const firstParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

export const parseBookFilters = (
  params: Record<string, string | string[] | undefined>,
): BookFilterValues => {
  const rawPages = firstParam(params.pages);

  return {
    search: firstParam(params.search).trim(),
    categoryName: firstParam(params.categoryName),
    publishedYear: firstParam(params.publishedYear),
    pages: isPageRange(rawPages) ? rawPages : "",
  };
};

export const hasBookFilters = (filters: BookFilterValues) =>
  Boolean(
    filters.search ||
      filters.categoryName ||
      filters.publishedYear ||
      filters.pages,
  );

export const filterBooks = (
  books: BooksTypes[],
  filters: BookFilterValues,
): BooksTypes[] => {
  const search = filters.search.toLowerCase();

  return books.filter((book) => {
    const matchesSearch =
      !search ||
      [book.title, book.author, book.description].some((field) =>
        field.toLowerCase().includes(search),
      );
    const matchesCategory =
      !filters.categoryName || book.categoryName === filters.categoryName;
    const matchesYear =
      !filters.publishedYear ||
      String(book.publishedYear) === filters.publishedYear;
    const matchesPages = !filters.pages || matchesPageRange(book.pages, filters.pages);

    return matchesSearch && matchesCategory && matchesYear && matchesPages;
  });
};

export const getPublishedYears = (books: BooksTypes[]) =>
  Array.from(new Set(books.map((book) => book.publishedYear))).sort(
    (a, b) => b - a,
  );
