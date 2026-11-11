import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 py-6 px-6 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Brand & Logo */}
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-emerald-600/20 rounded-md border border-emerald-500/30 text-emerald-400">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white">
            ReadLoop
          </span>
        </div>

        {/* Copyright */}
        <p className="text-slate-500">
          © {new Date().getFullYear()} ReadLoop Library. All rights reserved.
        </p>

        {/* Minimal Navigation Links */}
        <div className="flex items-center space-x-5">
          <Link
            href="/privacy"
            className="hover:text-emerald-400 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="hover:text-emerald-400 transition-colors"
          >
            Terms
          </Link>
          <Link
            href="/support"
            className="hover:text-emerald-400 transition-colors"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
