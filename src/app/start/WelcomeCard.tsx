"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WelcomeCard = () => {
  const { data } = useSession();
  const user = data?.user;
  return (
    <Card className="bg-linear-to-r from-emerald-950 to-emerald-900 text-white border-none shadow-xl overflow-hidden relative">
      <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <CardContent className="p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            <Sparkles className="h-3 w-3" />
            {user?.role === "admin" ? "Admin " : "Reader "} Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.role === "admin" ? " Admin" : " Reader"}! 👋
          </h1>
          <p className="text-emerald-100/70 text-sm sm:text-base max-w-xl leading-relaxed">
            Your digital gateway to thousands of physical titles. Browse new
            arrivals, reserve books, and track your borrowings easily.
          </p>
        </div>

        {/* Profile Summary Badge */}
        <Link
          href={`/start/dashboard`}
          className="flex items-center gap-4 bg-emerald-900/60 hover:bg-emerald-900/80 transition-all p-4 rounded-2xl border border-emerald-700/50 backdrop-blur-md shrink-0 shadow-lg shadow-emerald-950/20 group"
        >
          {/* Rounded Profile Image Container */}
          <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-emerald-500/50 shrink-0 bg-emerald-800">
            <Image
              src={user?.image || "https://github.com/shadcn.png"}
              alt={user?.name || "User"}
              fill
              sizes="56px"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <h4 className="font-bold text-base text-white tracking-tight">
              {user?.name || "Valued Reader"}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-300 capitalize tracking-wide">
                Role: {user?.role === "admin" ? "Admin" : "Reader"}
              </span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
