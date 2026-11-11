import Link from "next/link";
import { ArrowRight, LogIn, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Glow & Aesthetic Blur Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Banner / Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-12 z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Role-Based Digital Library Ecosystem</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Discover & Borrow Books with a{" "}
            <span className="text-emerald-400">Greenish Aesthetic</span>
          </h1>

          {/* Description */}
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            ReadLoop is your professional library management portal. Explore
            physical titles, reserve books, and track your borrowings
            effortlessly in one workspace.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/start"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-medium text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/sign-in"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-sm rounded-xl border border-slate-800 transition-all flex items-center justify-center space-x-2"
            >
              <LogIn className="h-4 w-4 text-slate-400" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center z-10 gap-2">
        <p>
          © {new Date().getFullYear()} ReadLoop Digital Library System. All
          rights reserved.
        </p>
        <div className="flex space-x-6 text-slate-400">
          <span className="hover:text-white cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-white cursor-pointer">
            Terms of Service
          </span>
        </div>
      </footer>
    </main>
  );
}
