import Link from "next/link";
import { ArrowLeft, BookOpen, Library } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GetCategories } from "@/lib/actions/adminApi/adminApi";
import { GetBooks } from "@/lib/actions/bothApi/bothApi";
import {
  filterBooks,
  getPublishedYears,
  hasBookFilters,
  parseBookFilters,
} from "@/lib/bookFilters";
import BookCard from "./BookCard";
import BookFilters from "./BookFilters";

export default async function AllBooksPage({
  searchParams,
}: PageProps<"/books">) {
  const filters = parseBookFilters(await searchParams);
  const [books, categories] = await Promise.all([GetBooks(), GetCategories()]);

  const filteredBooks = filterBooks(books, filters);
  const years = getPublishedYears(books);
  const filtersActive = hasBookFilters(filters);

  return (
    <div className="min-h-screen bg-slate-50 pb-16 font-sans text-slate-900">
      <main className="mx-auto max-w-7xl space-y-6 px-4 pt-8 sm:px-6">
        <Link
          href="/start"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        {/* Page Header */}
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold tracking-wider text-emerald-700 uppercase">
              <Library className="h-3.5 w-3.5" />
              Full Catalog
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Browse all books
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Search the whole ReadLoop collection, filter by category, release
              year, or length, and open any title to see its full details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm"
            >
              {books.length} {books.length === 1 ? "title" : "titles"}
            </Badge>
            <Badge
              variant="outline"
              className="border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm"
            >
              {categories.length} categories
            </Badge>
          </div>
        </header>

        {/* Search and filters */}
        <BookFilters
          categories={categories}
          years={years}
          totalBooks={books.length}
          resultCount={filteredBooks.length}
        />

        {/* Book grid */}
        <section aria-labelledby="catalog-heading" className="space-y-4">
          <h2 id="catalog-heading" className="text-lg font-bold text-slate-900">
            Library Catalog
          </h2>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredBooks.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" />
              <h3 className="text-base font-semibold text-slate-800">
                No books found
              </h3>
              <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
                Try a different search term, or clear the filters to browse the
                full catalog.
              </p>
              {filtersActive && (
                <Link href="/books" className="mt-5 inline-block">
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    Clear filters
                  </Button>
                </Link>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
