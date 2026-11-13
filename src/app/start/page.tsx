import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WelcomeCard from "./WelcomeCard";
import { GetFeaturedBooks } from "@/lib/actions/bothApi/bothApi";
import { BooksTypes } from "@/lib/type";
import BookCard from "./BookCard";

export default async function StartPage() {
  const featuredBooks = await GetFeaturedBooks();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-10">
        {/* 1. Welcome Card Section */}
        <WelcomeCard />

        {/* Section Header with View All Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Featured Books
            </h2>
            <p className="text-sm text-slate-500">
              Explore recently added titles available for borrowing.
            </p>
          </div>
          <Link href="/books">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 flex items-center gap-2 group">
              <span>View All Books</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* 4. Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBooks.map((book: BooksTypes) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {/* Bottom Quick Access Banner */}
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-8 text-center space-y-4 mt-12">
          <h3 className="text-xl font-bold text-emerald-950">
            Want to explore our full library catalog?
          </h3>
          <p className="text-sm text-emerald-800/80 max-w-lg mx-auto">
            Access thousands of textbooks, programming guides, and literature.
            Search, filter, and reserve your desired books instantly.
          </p>
          <Link href="/books">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-8 py-2.5 shadow-md shadow-emerald-600/20">
              Browse All Books
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
