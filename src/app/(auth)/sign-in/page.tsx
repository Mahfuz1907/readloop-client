"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { signIn } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData) as Record<string, string>;

    const { data, error } = await signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
    });

    if (data) {
      toast.add({
        type: "success",
        description: "User Signed in Successfully",
      });
      router.push("/start");
    } else if (error) {
      toast.add({
        type: "error",
        description: "User Sign in failed",
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 text-slate-900 font-sans">
      {/* Left Column Showcase (Desktops) */}
      <div className="hidden lg:flex flex-col justify-between bg-emerald-950 text-white p-12 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-3 z-10">
          <div className="p-2.5 bg-emerald-600/30 backdrop-blur-md rounded-xl border border-emerald-500/30 text-emerald-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            ReadLoop
          </span>
        </div>

        <div className="z-10 my-auto max-w-lg space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Welcome Back
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            Manage & access your reading portal.
          </h1>
          <p className="text-emerald-100/70 text-base leading-relaxed">
            Log in to manage your active borrowings, explore new physical
            catalog additions, and review due dates seamlessly.
          </p>

          <div className="pt-4 space-y-3">
            {[
              "Seamless catalog searching and reservations",
              "Track borrowed books & return schedules",
              "Secure authentication & role-based dashboard",
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 text-sm text-emerald-100/80"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Shadcn Sign-In Card */}
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50">
          {/* Mobile Brand Header */}
          <div className="flex items-center justify-between lg:hidden mb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-600 rounded-lg text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-emerald-950">
                ReadLoop
              </span>
            </div>
          </div>

          {/* Form Header */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Create an account
            </h2>
            <p className="text-sm text-slate-500">
              Enter your information below to sign up as a new reader.
            </p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup>
              {/* Email Address */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Email Address
                </FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    required
                    name="email"
                    placeholder="reader@readloop.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-lg outline-none transition-all duration-200 focus:bg-white border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </Field>

              {/* Password */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Your Password"
                    className={`w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border rounded-lg outline-none transition-all duration-200 focus:bg-white border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Field>

              {/* Shadcn UI Styled Primary Button */}
              <Field>
                <Button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-sm rounded-lg shadow-md shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
