"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  BookMarked,
  Users,
  GitPullRequest,
  PlusCircle,
  Settings,
  ChevronRight,
  FileChartColumn,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GetSessionFromClient } from "@/lib/GetSessionFromClient";
import Image from "next/image";

export default function AdminSidebar() {
  const user = GetSessionFromClient();
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Overview",
      url: "/start/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Categories",
      url: "/start/admin/categories",
      icon: FileChartColumn,
    },
    {
      title: "Book Inventory",
      url: "/start/admin/books",
      icon: BookMarked,
    },
    {
      title: "Add New Book",
      url: "/start/admin/add-books",
      icon: PlusCircle,
    },
    {
      title: "Borrow Requests",
      url: "/start/admin/borrows",
      icon: GitPullRequest,
    },
    {
      title: "User Management",
      url: "/start/admin/users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/start/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="border-r border-slate-800 bg-slate-950 text-slate-200 pt-19">
      {/* 1. Header Section - Logo & Brand */}
      <SidebarHeader className="border-b border-slate-800/80 p-4">
        <Link href="/start" className="flex items-center space-x-3 group">
          <div className="p-2 bg-emerald-600/20 rounded-xl border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-600/30 transition-colors">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-emerald-400 tracking-tight leading-none">
              ReadLoop
            </span>
            <span className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase mt-1">
              Admin Portal
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* 2. Main Navigation Menu */}
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-900"
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 w-full"
                      >
                        <item.icon
                          className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`}
                        />
                        <span>{item.title}</span>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 ml-auto text-emerald-200" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. Footer Section - Settings & Logout */}
      <SidebarFooter className="border-t border-slate-800/80 p-3">
        {/* Admin Profile Mini Card */}
        <div className="flex items-center gap-3 bg-slate-900/90 hover:bg-slate-900 transition-all p-2.5 rounded-xl border border-slate-800 shrink-0 shadow-sm group">
          {/* Admin Avatar */}
          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-emerald-500/40 shrink-0 bg-emerald-950">
            <Image
              src={user?.image || "https://github.com/shadcn.png"}
              alt={user?.name || "Admin"}
              fill
              sizes="36px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Admin Info */}
          <div className="flex flex-col min-w-0 flex-1">
            <h4 className="font-semibold text-xs text-white truncate leading-tight">
              {user?.name || "Admin User"}
            </h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] text-emerald-400 font-medium capitalize truncate">
                {user?.role === "admin" ? "Admin" : "Reader"}
              </span>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
