"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Users,
  GitPullRequest,
  Clock,
  ArrowUpRight,
  TrendingUp,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminOverviewPage() {
  // 1. ডামি স্ট্যাটস ডেটা
  const stats = [
    {
      title: "Total Books",
      value: "1,248",
      change: "+12% from last month",
      icon: BookOpen,
      color: "text-emerald-400",
      bgColor: "bg-emerald-950/60 border-emerald-800/50",
    },
    {
      title: "Active Readers",
      value: "452",
      change: "+8% from last month",
      icon: Users,
      color: "text-teal-400",
      bgColor: "bg-teal-950/60 border-teal-800/50",
    },
    {
      title: "Active Borrows",
      value: "89",
      change: "23 due this week",
      icon: GitPullRequest,
      color: "text-emerald-300",
      bgColor: "bg-emerald-900/40 border-emerald-700/40",
    },
    {
      title: "Pending Requests",
      value: "14",
      change: "Requires admin action",
      icon: Clock,
      color: "text-amber-400",
      bgColor: "bg-amber-950/40 border-amber-800/40",
    },
  ];

  // 2. পেন্ডিং বরো রিকোয়েস্ট ডেটা
  const pendingRequests = [
    {
      id: 1,
      user: "Sadia Rahman",
      book: "Clean Code",
      date: "10 mins ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    },
    {
      id: 2,
      user: "Tanvir Ahmed",
      book: "Designing Data-Intensive Applications",
      date: "1 hour ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      id: 3,
      user: "Nusrat Jahan",
      book: "The Pragmatic Programmer",
      date: "3 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
  ];

  // 3. রিসেন্ট এক্টিভিটিজ
  const recentActivities = [
    {
      id: 1,
      action: "Book Returned",
      detail: "'JavaScript: The Good Parts' returned by Arafat",
      time: "25 mins ago",
      status: "success",
    },
    {
      id: 2,
      action: "New Book Added",
      detail: "'System Design Interview' added to inventory",
      time: "2 hours ago",
      status: "info",
    },
    {
      id: 3,
      action: "Overdue Notice Sent",
      detail: "Notice sent to Mehedi for 'Refactoring'",
      time: "5 hours ago",
      status: "warning",
    },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Overview Dashboard ⚡
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time library analytics, pending approvals, and active inventory
            status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/start/dashboard/books/add">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add New Book</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 1. Key Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => (
          <Card
            key={index}
            className={`${item.bgColor} border text-white shadow-lg backdrop-blur-md`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {item.title}
              </CardTitle>
              <div
                className={`p-2 rounded-lg bg-slate-900/60 border border-slate-700/50 ${item.color}`}
              >
                <item.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {item.value}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-400 inline" />
                {item.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Main Analytics & Pending Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Borrow Requests Needing Approval (2 cols) */}
        <Card className="lg:col-span-2 bg-slate-950/60 border-slate-800 text-white shadow-xl backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                Pending Borrow Requests
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 mt-0.5">
                Review and approve student or reader borrowing queues.
              </CardDescription>
            </div>
            <Link
              href="/start/dashboard/borrows"
              className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-4">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden border border-emerald-500/40 shrink-0 bg-emerald-950">
                      <Image
                        src={req.avatar}
                        alt={req.user}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-snug">
                        {req.user}
                      </h4>
                      <p className="text-xs text-slate-400">
                        Requested:{" "}
                        <span className="text-emerald-400 font-medium">
                          {req.book}
                        </span>
                      </p>
                      <span className="text-[10px] text-slate-500">
                        {req.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 border-rose-900/60 text-rose-400 hover:bg-rose-950 hover:text-rose-300 text-xs"
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 bg-emerald-600 hover:bg-emerald-500 text-white text-xs shadow-md shadow-emerald-600/20"
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Quick System Activity Stream (1 col) */}
        <Card className="bg-slate-950/60 border-slate-800 text-white shadow-xl backdrop-blur-md">
          <CardHeader className="border-b border-slate-800/80 pb-4">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              System Activity Log
            </CardTitle>
            <CardDescription className="text-xs text-slate-400 mt-0.5">
              Live updates across ReadLoop inventory.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {recentActivities.map((act) => (
                <div key={act.id} className="relative">
                  {/* Status Indicator Icon */}
                  <span className="absolute -left-6 top-0.5 transform -translate-x-1/2 p-1 rounded-full bg-slate-950 border border-slate-700">
                    {act.status === "success" && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    )}
                    {act.status === "info" && (
                      <BookOpen className="h-3.5 w-3.5 text-teal-400" />
                    )}
                    {act.status === "warning" && (
                      <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                    )}
                  </span>

                  <div className="space-y-0.5">
                    <h5 className="text-xs font-semibold text-white">
                      {act.action}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {act.detail}
                    </p>
                    <span className="text-[10px] text-slate-500">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Audit Log Link */}
            <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
              <Link
                href="/start/dashboard/logs"
                className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>View System Audit Trail</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
