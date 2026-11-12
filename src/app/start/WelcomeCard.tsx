"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GetSessionFromClient } from "@/lib/GetSessionFromClient";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WelcomeCard = () => {
  const user = GetSessionFromClient();
  if (user?.role === "admin") {
    return (
      <Card className="bg-linear-to-r from-teal-950 via-emerald-950 to-slate-950 text-white border border-teal-500/30 shadow-2xl overflow-hidden relative">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <CardContent className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/40 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-teal-400" />
              Admin Command Center
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, Admin {user?.name?.split(" ")[0]}! ⚡
            </h1>
            <p className="text-teal-100/70 text-sm sm:text-base max-w-xl leading-relaxed">
              Manage library inventory, oversee active borrowings, review user
              requests, and monitor system operations seamlessly.
            </p>
          </div>

          <Link
            href={`/start/${user?.role}`}
            className="flex items-center gap-4 bg-teal-900/60 hover:bg-teal-900/80 transition-all p-4 rounded-2xl border border-teal-600/50 backdrop-blur-md shrink-0 shadow-lg shadow-teal-950/40 group"
          >
            <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-teal-400/60 shrink-0 bg-teal-800">
              <Image
                src={user?.image || "https://github.com/shadcn.png"}
                alt={user?.name || "Admin"}
                fill
                sizes="56px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-base text-white tracking-tight">
                {user?.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-xs font-medium text-teal-300 capitalize tracking-wide">
                  Role: Admin
                </span>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (user?.role === "reader" || (user && !user.role)) {
    return (
      <Card className="bg-linear-to-r from-emerald-950 to-emerald-900 text-white border-none shadow-xl overflow-hidden relative">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <CardContent className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              Reader Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Welcome back, {user?.name || "Reader"}! 👋
            </h1>
            <p className="text-emerald-100/70 text-sm sm:text-base max-w-xl leading-relaxed">
              Your digital gateway to thousands of physical titles. Browse new
              arrivals, reserve books, and track your borrowings easily.
            </p>
          </div>

          <Link
            href="/start/dashboard"
            className="flex items-center gap-4 bg-emerald-900/60 hover:bg-emerald-900/80 transition-all p-4 rounded-2xl border border-emerald-700/50 backdrop-blur-md shrink-0 shadow-lg shadow-emerald-950/20 group"
          >
            <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-emerald-500/50 shrink-0 bg-emerald-800">
              <Image
                src={user?.image || "https://github.com/shadcn.png"}
                alt={user?.name || "User"}
                fill
                sizes="56px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-base text-white tracking-tight">
                {user?.name || "Valued Reader"}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-300 capitalize tracking-wide">
                  Role: Reader
                </span>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-linear-to-r from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-500/20 shadow-xl overflow-hidden relative">
      <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <CardContent className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            Explore ReadLoop
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome, Guest Visitor! 📖
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Sign in or create an account to unlock full borrowing capabilities,
            reserve physical titles, and track your reading history.
          </p>
        </div>

        {/* Action Buttons for Guest */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/sign-in"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all shadow-md shadow-emerald-600/20"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition-all"
          >
            Sign Up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
