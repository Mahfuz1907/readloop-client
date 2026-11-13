import Image from "next/image";
import Link from "next/link";
import { BookOpen, Calendar, FileText, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BooksTypes } from "@/lib/type";

type BookTableProps = {
  books: BooksTypes[];
  hasFilters: boolean;
};

export default function BookTable({ books, hasFilters }: BookTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800">
      <Table>
        <TableHeader className="bg-slate-900">
          <TableRow className="border-slate-800 hover:bg-slate-900">
            <TableHead className="min-w-52 text-xs font-bold uppercase tracking-wider text-slate-300 md:min-w-72">
              Book
            </TableHead>
            <TableHead className="hidden text-xs font-bold uppercase tracking-wider text-slate-300 sm:table-cell">
              Category
            </TableHead>
            <TableHead className="hidden whitespace-nowrap text-xs font-bold uppercase tracking-wider text-slate-300 md:table-cell">
              Published
            </TableHead>
            <TableHead className="hidden text-xs font-bold uppercase tracking-wider text-slate-300 md:table-cell">
              Pages
            </TableHead>
            <TableHead className="hidden whitespace-nowrap text-xs font-bold uppercase tracking-wider text-slate-300 md:table-cell">
              Copies
            </TableHead>
            <TableHead className="sticky right-0 z-10 whitespace-nowrap border-l border-slate-800 bg-slate-900 pr-6 text-right text-xs font-bold uppercase tracking-wider text-slate-300">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {books.length > 0 ? (
            books.map((book) => (
              <TableRow
                key={book._id}
                className="group border-slate-800/70 transition-colors hover:bg-slate-900"
              >
                <TableCell className="max-w-md py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md border border-slate-800 bg-slate-900">
                      {book.coverImage ? (
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <BookOpen className="h-4 w-4 text-slate-600" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="truncate text-sm font-semibold text-white"
                        title={book.title}
                      >
                        {book.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {book.author}
                      </p>
                      <p className="mt-1 line-clamp-1 text-[11px] text-slate-500">
                        {book.description}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  <Badge
                    variant="outline"
                    className="max-w-48 truncate whitespace-nowrap border-emerald-800/60 bg-emerald-950/60 text-[11px] text-emerald-400"
                  >
                    {book.categoryName}
                  </Badge>
                </TableCell>

                <TableCell className="hidden text-xs text-slate-300 md:table-cell">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    {book.publishedYear}
                  </span>
                </TableCell>

                <TableCell className="hidden text-xs text-slate-300 md:table-cell">
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-slate-500" />
                    {book.pages}
                  </span>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant="outline"
                    className="whitespace-nowrap border-slate-700 bg-slate-900 text-[11px] text-slate-300"
                  >
                    {book.totalCopies}{" "}
                    {book.totalCopies === 1 ? "copy" : "copies"}
                  </Badge>
                </TableCell>

                <TableCell className="sticky right-0 z-10 border-l border-slate-800/70 bg-slate-950 pr-6 text-right transition-colors group-hover:bg-slate-900">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      aria-label={`Edit ${book.title}`}
                      title="Edit book"
                      className="h-8 w-8 shrink-0 border-emerald-500/50 bg-emerald-950/50 p-0 text-emerald-400 transition-colors hover:border-emerald-500 hover:bg-emerald-600 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      aria-label={`Delete ${book.title}`}
                      title="Delete book"
                      className="h-8 w-8 shrink-0 border-rose-500/50 bg-rose-950/50 p-0 text-rose-400 transition-colors hover:border-rose-500 hover:bg-rose-600 hover:text-white focus-visible:ring-2 focus-visible:ring-rose-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="py-16 text-center">
                <BookOpen className="mx-auto mb-3 h-8 w-8 text-slate-600" />
                <p className="text-sm font-medium text-slate-300">
                  No books found
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Try a different search term or filter combination.
                </p>
                {hasFilters && (
                  <Link href="/start/admin/books" className="mt-4 inline-block">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Clear filters
                    </Button>
                  </Link>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
