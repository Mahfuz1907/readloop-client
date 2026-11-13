import { Layers } from "lucide-react";
import AddCategoryDialogue from "./AddCategoryDialogue";
import { GetCategories } from "@/lib/actions/adminApi/adminApi";
import DisplayAllCategories from "./DisplayAllCategories";
import SearchImplement from "./SearchImplement";

export default async function CategoriesPage({
  searchParams,
}: PageProps<"/start/admin/categories">) {
  const { search } = await searchParams;
  const categories = await GetCategories(typeof search === "string" ? search : "");

  return (
    <div className="space-y-6 font-sans">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <Layers className="h-7 w-7 text-emerald-400" />
            Book Categories
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize library inventory by defining, updating, and managing book
            genres.
          </p>
        </div>

        {/* Add Category Modal Button */}
        <AddCategoryDialogue />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <SearchImplement />
        <div className="text-xs text-slate-400 font-medium hidden sm:block">
          Total Categories:{" "}
          <span className="text-emerald-400 font-bold">
            {categories.length}
          </span>
        </div>
      </div>

      {/* Category Data Table */}
      <DisplayAllCategories categories={categories} />
    </div>
  );
}
