import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  FileText,
  Layers,
  Library,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GetBooks } from "@/lib/actions/bothApi/bothApi";
import { cn } from "@/lib/utils";

export default async function BookDetailsPage({
  params,
}: PageProps<"/books/[id]">) {
  const { id } = await params;
  const books = await GetBooks();
  const book = books.find((item) => item._id === id);

  if (!book) notFound();

  const isAvailable = book.totalCopies > 0;

  const stats = [
    { label: "Published", value: String(book.publishedYear), icon: Calendar },
    { label: "Pages", value: String(book.pages), icon: FileText },
    { label: "Copies", value: String(book.totalCopies), icon: Library },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 font-sans text-slate-900">
      <main className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-emerald-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all books
        </Link>

        <article className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-10">
            {/* Cover & availability */}
            <div className="mx-auto w-full max-w-72 lg:mx-0 lg:max-w-none">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-md">
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 288px, 320px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-12 w-12 text-slate-300" />
                  </div>
                )}
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                  Availability
                </p>
                <p
                  className={cn(
                    "mt-1 text-sm font-semibold",
                    isAvailable ? "text-emerald-700" : "text-rose-600",
                  )}
                >
                  {isAvailable
                    ? `${book.totalCopies} ${
                        book.totalCopies === 1 ? "copy" : "copies"
                      } in library`
                    : "All copies currently borrowed"}
                </p>
              </div>
            </div>

            {/* Book information */}
            <div className="flex flex-col">
              <Badge
                variant="outline"
                className="w-fit border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700"
              >
                {book.categoryName}
              </Badge>

              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {book.title}
              </h1>

              <p className="mt-1 text-sm font-medium text-slate-500">
                By <span className="text-slate-700">{book.author}</span>
              </p>

              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                {book.description}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <dt className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                      <stat.icon className="h-3.5 w-3.5 text-slate-400" />
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-lg font-bold text-slate-900">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  disabled={!isAvailable}
                  className="bg-emerald-600 font-medium text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-60"
                >
                  Request Borrow
                </Button>

                <Link
                  href={`/books?categoryName=${encodeURIComponent(
                    book.categoryName,
                  )}`}
                >
                  <Button
                    variant="outline"
                    className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 sm:w-auto"
                  >
                    <Layers className="h-4 w-4" />
                    More in {book.categoryName}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
