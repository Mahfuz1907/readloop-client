import { BooksTypes } from "@/lib/type";
import { cn } from "cn";
import { ArrowRight, BookOpen, Calendar, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BookCard = ({ book }: { book: BooksTypes }) => {
  const isAvailable = book.totalCopies > 0;
  return (
    <Link
      href={`/books/${book._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 outline-none hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      {/* Cover */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-slate-100">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-10 w-10 text-slate-300" />
          </div>
        )}

        <span className="absolute top-3 left-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-emerald-700 shadow-sm backdrop-blur">
          {book.categoryName}
        </span>

        <span
          className={cn(
            "absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur",
            isAvailable ? "bg-emerald-600/90" : "bg-rose-600/90",
          )}
        >
          {isAvailable ? `${book.totalCopies} available` : "Unavailable"}
        </span>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex-1">
          <h3
            className="line-clamp-2 text-base leading-snug font-bold text-slate-900 transition-colors group-hover:text-emerald-700"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-500">
            By {book.author}
          </p>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {book.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {book.publishedYear}
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-slate-400" />
            {book.pages} pages
          </span>
        </div>

        <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 px-4 py-2.5 text-sm font-medium text-emerald-700 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
          View Details
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

export default BookCard;
