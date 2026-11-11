"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WelcomeCard from "./WelcomeCard";
import Image from "next/image";

export default function StartPage() {
  // ডামি ফিচারড বইয়ের ডেটা (পরে এগুলো ডাটাবেজ থেকে ফেচ করতে পারবেন)
  const featuredBooks = [
    {
      id: 1,
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin",
      category: "Programming",
      image:
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 2,
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      category: "Software Engineering",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: 3,
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Erich Gamma et al.",
      category: "Architecture",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    },
  ];

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
          {featuredBooks.map((book) => (
            <Card
              key={book.id}
              className="border-slate-200/80 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group bg-white"
            >
              <div>
                {/* Book Thumbnail & Category Badge */}
                <div className="h-52 w-full bg-slate-100 overflow-hidden relative">
                  <div className="h-52 w-full bg-slate-100 overflow-hidden relative">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-full z-10">
                      {book.category}
                    </span>
                  </div>
                </div>

                <CardHeader className="space-y-1.5">
                  <CardTitle
                    className="text-lg font-bold text-slate-900 line-clamp-1"
                    title={book.title}
                  >
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    By {book.author}
                  </CardDescription>
                </CardHeader>
              </div>

              <CardContent className="pt-0 pb-6 px-6">
                <Button
                  variant="outline"
                  className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                >
                  Request Borrow
                </Button>
              </CardContent>
            </Card>
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
