import { BookPlus } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddBookForm from "./AddBookForm";
import { GetCategories } from "@/lib/actions/adminApi/adminApi";

export default async function AddBookPage() {
  const categories = await GetCategories();

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans pb-12">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <BookPlus className="h-7 w-7 text-emerald-400" />
            Add New Book
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill in the details below to add a new book to the ReadLoop
            inventory.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="bg-slate-950 border-slate-800 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-emerald-400">
            Book Information
          </CardTitle>
          <CardDescription className="text-xs text-slate-400">
            All fields marked with metadata will be stored in the database.
          </CardDescription>
        </CardHeader>

        {/* add book form */}
        <AddBookForm categories={categories} />
      </Card>
    </div>
  );
}
