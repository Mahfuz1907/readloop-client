"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Camera,
} from "lucide-react";
import { uploadImageUrl } from "@/lib/uploadImageUrl";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData) as Record<string, string>;
    const imageUrl = userData.image;
    const finalImage = await uploadImageUrl(imageUrl as string);
    userData.image = finalImage;
    userData.role = "reader";

    const { data, error } = await signUp.email({
      name: userData.name as string,
      email: userData.email as string,
      password: userData.password as string,
      image: userData.image as string,
      role: userData.role as string,
    });

    if (data) {
      toast.add({
        type: "success",
        description: "Reader Created Successfully",
      });
      router.push("/start");
    } else if (error) {
      toast.add({
        type: "error",
        description: "Reader creation failed",
      });
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 text-slate-900 font-sans">
      {/* Left Column - Decorative Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-col justify-between bg-emerald-950 text-white p-12 relative overflow-hidden">
        {/* Background Gradients & Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Header */}
        <div className="flex items-center space-x-3 z-10">
          <div className="p-2.5 bg-emerald-600/30 backdrop-blur-md rounded-xl border border-emerald-500/30 text-emerald-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            ReadLoop
          </span>
        </div>

        {/* Hero Content */}
        <div className="z-10 my-auto max-w-lg space-y-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Digital Library Ecosystem
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
            Discover your next favorite book today.
          </h1>
          <p className="text-emerald-100/70 text-base leading-relaxed">
            Join thousands of avid readers. Reserve, borrow, and read physical
            books seamless through our modernized lending portal.
          </p>

          <div className="pt-4 space-y-3">
            {[
              "Instant book request & reservation tracking",
              "Personalized reading dashboard & due date reminders",
              "Access to thousands of Tech, Fiction, & History titles",
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

      {/* Right Column - Sign Up Form */}
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
              {/* Full Name */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Full Name
                </FieldLabel>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border rounded-lg outline-none transition-all duration-200 focus:bg-white border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                  />
                </div>
              </Field>

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

              {/* image upload */}
              <Field className="space-y-1.5">
                <FieldLabel className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Profile Image
                </FieldLabel>
                <div className="relative flex items-center justify-center">
                  <Camera className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="file"
                    name="image"
                    className="w-full pl-10 pr-4 py-1.5 text-sm bg-slate-50 border rounded-lg outline-none transition-all duration-200 focus:bg-white border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
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
                <FieldDescription>
                  Must be at least 4 characters long.
                </FieldDescription>
              </Field>

              {/* Shadcn UI Styled Primary Button */}
              <Field>
                <Button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-sm rounded-lg shadow-md shadow-emerald-600/20 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-slate-100 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
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
