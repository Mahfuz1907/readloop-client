import React from "react";
import {
  Users,
  Shield,
  CheckCircle2,
  XCircle,
  Mail,
  Calendar,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserTypes } from "@/lib/type";
import { GetUsers } from "@/lib/actions/adminApi/adminApi";
import { UserSearchInput } from "./UserSearchInput";

export default async function AdminUsersPage({
  searchParams,
}: PageProps<"/start/admin/users">) {
  const { search } = await searchParams;
  const users = await GetUsers(typeof search === "string" ? search : "");

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-12">
      {/* Page Header with Search Bar Integration */}
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Users className="h-7 w-7 text-emerald-400" />
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            View and manage all registered library readers and their account
            statuses.
          </p>
        </div>
      </div>

      {/* আলাদা কম্পোনেন্ট হিসেবে সার্চ বারটি এখানে কল করা হয়েছে */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
        <UserSearchInput />
        <Badge
          variant="outline"
          className="bg-emerald-950/40 border-emerald-800 text-emerald-400 px-3 py-1.5 text-xs h-10 flex items-center"
        >
          Total Readers: {users.length}
        </Badge>
      </div>

      {/* Users Table Card */}
      <Card className="bg-slate-950 border-slate-800 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-emerald-400">
            Registered Users
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            A list of all users retrieved from the database with reader
            privileges.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-slate-800 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-900/80">
                <TableRow className="border-slate-800 hover:bg-slate-900">
                  <TableHead className="text-slate-300 text-xs font-semibold">
                    User Details
                  </TableHead>
                  <TableHead className="text-slate-300 text-xs font-semibold">
                    Email Status
                  </TableHead>
                  <TableHead className="text-slate-300 text-xs font-semibold">
                    Role
                  </TableHead>
                  <TableHead className="text-slate-300 text-xs font-semibold">
                    Joined Date
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.length > 0 ? (
                  users.map((user: UserTypes) => (
                    <TableRow
                      key={user._id || user.email}
                      className="border-slate-800 hover:bg-slate-900/50 transition-colors"
                    >
                      {/* User Profile & Name */}
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border border-emerald-500/30">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback className="bg-emerald-950 text-emerald-400 text-xs font-bold">
                              {user.name
                                ? user.name.slice(0, 2).toUpperCase()
                                : "RL"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-white">
                              {user.name}
                            </p>
                            <p className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Mail className="h-3 w-3 text-slate-500" />{" "}
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Email Verified Status */}
                      <TableCell>
                        {user.emailVerified ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-950/40 border border-amber-800/40 text-amber-400">
                            <XCircle className="h-3 w-3" /> Unverified
                          </span>
                        )}
                      </TableCell>

                      {/* Role */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-slate-900 border-slate-800 text-emerald-400 text-[11px] capitalize"
                        >
                          <Shield className="h-3 w-3 mr-1 text-emerald-500" />{" "}
                          {user.role || "reader"}
                        </Badge>
                      </TableCell>

                      {/* Joined Date */}
                      <TableCell className="text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-slate-500" />
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )
                            : "N/A"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="h-24 text-center text-slate-500 text-xs"
                    >
                      No users found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
