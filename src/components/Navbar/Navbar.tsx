"use client";

import { BookOpen, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GetSessionFromClient } from "@/lib/GetSessionFromClient";

const Navbar = () => {
  const router = useRouter();
  const user = GetSessionFromClient();
  return (
    <nav className="bg-emerald-950 text-white border-b border-emerald-900/50 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={"/"} className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-600/30 rounded-xl border border-emerald-500/30 text-emerald-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">ReadLoop</span>
        </Link>

        <div className="flex items-center space-x-3">
          {user ? (
            <Button
              onClick={() =>
                signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.push("/sign-in");
                    },
                  },
                })
              }
              variant="ghost"
              className="text-emerald-100 hover:text-white hover:bg-emerald-900 text-sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
