import Link from "next/link";
import { BookMarked, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetCategories } from "@/lib/actions/adminApi/adminApi";
import { GetBooks } from "@/lib/actions/bothApi/bothApi";
import {
  filterBooks,
  getPublishedYears,
  hasBookFilters,
  parseBookFilters,
} from "@/lib/bookFilters";
import BookFilters from "./BookFilters";
import BookTable from "./BookTable";

export default async function BookManagementPage({
  searchParams,
}: PageProps<"/start/admin/books">) {
  const filters = parseBookFilters(await searchParams);

  const [books, categories] = await Promise.all([GetBooks(), GetCategories()]);

  const filteredBooks = filterBooks(books, filters);
  const years = getPublishedYears(books);
  const hasFilters = hasBookFilters(filters);

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-12 font-sans">
      {/* Page Header */}
      <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            <BookMarked className="h-7 w-7 text-emerald-400" />
            Book Inventory
          </h1>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Browse, filter, and manage every title in the ReadLoop catalog.
          </p>
        </div>

        <Link href="/start/admin/add-books" className="self-start sm:self-auto">
          <Button className="flex items-center gap-2 bg-emerald-600 text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-500">
            <PlusCircle className="h-4 w-4" />
            Add New Book
          </Button>
        </Link>
      </div>

      {/* Search and filters */}
      <BookFilters
        categories={categories}
        years={years}
        totalBooks={books.length}
        resultCount={filteredBooks.length}
      />

      {/* Book inventory table */}
      <Card className="border-slate-800 bg-slate-950 text-white shadow-2xl">
        <CardHeader className="flex flex-col gap-2 border-b border-slate-800/80 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-emerald-400">
              Library Catalog
            </CardTitle>
            <CardDescription className="text-xs text-slate-400">
              All books matching the current search and filters.
            </CardDescription>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-emerald-800 bg-emerald-950/40 px-3 py-1.5 text-xs text-emerald-400"
          >
            {filteredBooks.length}{" "}
            {filteredBooks.length === 1 ? "book" : "books"}
          </Badge>
        </CardHeader>

        <CardContent className="pt-6">
          <BookTable books={filteredBooks} hasFilters={hasFilters} />
        </CardContent>
      </Card>
    </div>
  );
}
