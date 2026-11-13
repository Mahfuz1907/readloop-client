"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { AddBook } from "@/lib/actions/adminApi/adminApi";
import { AddBooksTypes, CategoryTypes } from "@/lib/type";
import {
  BookPlus,
  Calendar,
  CheckCircle2,
  FileText,
  Hash,
  ImageIcon,
  Layers,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddBookForm = ({ categories }: { categories: CategoryTypes[] }) => {
  const router = useRouter();
  const [catData, setCatData] = useState({
    categoryName: "",
    categorySlug: "",
    categoryDescription: "",
  });
  const handleCategorySelect = (slug: string) => {
    const selected = categories.find((cat) => cat.categorySlug === slug);
    if (selected) {
      setCatData({
        categoryName: selected.categoryName,
        categorySlug: selected.categorySlug,
        categoryDescription: selected.categoryDescription,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const bookData = { ...catData, ...data };

    const result = await AddBook(bookData as AddBooksTypes);
    if (result.ok || result.success || result.acknowledged) {
      toast.add({
        type: "success",
        description: "Book added successfully",
      });
      router.push("/start/admin/books");
    } else {
      toast.add({
        type: "error",
        description: "Book add failed",
      });
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Grid Layout for Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <BookPlus className="h-3.5 w-3.5 text-emerald-400" /> Book Title
            </Label>
            <Input
              name="title"
              placeholder="e.g. Clean Code"
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm text-white"
              required
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-emerald-400" /> Author Name
            </Label>
            <Input
              name="author"
              placeholder="e.g. Robert C. Martin"
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm text-white"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-400" /> Category
            </Label>
            <Select
              onValueChange={(val) => handleCategorySelect(val as string)}
              required
            >
              <SelectTrigger className="bg-slate-900 border-slate-800 text-white focus:ring-emerald-600 text-sm">
                <SelectValue placeholder="Select a book category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-950 border-slate-800 text-white">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat.categorySlug}
                    value={cat.categorySlug}
                    className="focus:bg-emerald-950 focus:text-emerald-400 cursor-pointer text-xs sm:text-sm"
                  >
                    {cat.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cover Image URL */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <ImageIcon className="h-3.5 w-3.5 text-emerald-400" /> Cover Image
              URL
            </Label>
            <Input
              name="coverImage"
              type="url"
              placeholder="https://i.ibb.co/..."
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm text-white"
              required
            />
          </div>

          {/* Published Year */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-emerald-400" /> Published
              Year
            </Label>
            <Input
              name="publishedYear"
              type="number"
              placeholder="2026"
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm text-white"
              required
            />
          </div>

          {/* Pages */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-emerald-400" /> Total Pages
            </Label>
            <Input
              type="number"
              name="pages"
              placeholder="350"
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm text-white"
              required
            />
          </div>

          {/* Total Copies */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Hash className="h-3.5 w-3.5 text-emerald-400" /> Total Copies in
              Library
            </Label>
            <Input
              type="number"
              name="totalCopies"
              placeholder="5"
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm text-white"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-emerald-400" /> Book
              Description
            </Label>
            <Textarea
              name="description"
              placeholder="Write a brief summary or description of the book..."
              rows={4}
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm text-white resize-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button
            type="reset"
            variant="ghost"
            className="text-slate-400 text-xs sm:text-sm"
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4" />
            Publish Book
          </Button>
        </div>
      </form>
    </CardContent>
  );
};

export default AddBookForm;
