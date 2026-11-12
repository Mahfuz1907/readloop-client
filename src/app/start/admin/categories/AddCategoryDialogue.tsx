"use client";

import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FolderPlus, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { AddCategory } from "@/lib/actions/adminApi/adminApi";
import { AddCategoryTypes } from "@/lib/type";
import { toast } from "@/components/ui/toast";

const AddCategoryDialogue = () => {
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const categoryData = Object.fromEntries(
      formData,
    ) as unknown as AddCategoryTypes;

    const result = await AddCategory(categoryData);

    if (result.success || result.ok || result.acknowledged) {
      toast.add({
        title: "Success",
        description: "Category addition successfull",
      });
      router.refresh();
    } else {
      toast.add({
        title: "Error",
        description: "Category addition error",
      });
    }
  };
  return (
    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
      <Button
        onClick={() => setIsAddOpen(true)}
        className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2"
      >
        <PlusCircle className="h-4 w-4" />
        <span>Add Category</span>
      </Button>

      {/* Add Category Modal Dialog */}
      <AlertDialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2 text-white">
            <FolderPlus className="h-5 w-5 text-emerald-400" />
            Create New Category
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Add a new genre or topic to categorize books in the library.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddCategory} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-300">
              Category Name
            </Label>
            <Input
              placeholder="e.g. Web Development"
              name="categoryName"
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-300">Slug</Label>
            <Input
              placeholder="web-development"
              name="categorySlug"
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm text-slate-400 font-mono"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-300">
              Description
            </Label>
            <Input
              placeholder="Short description of this category..."
              name="categoryDescription"
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsAddOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => setIsAddOpen(false)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Save Category
            </Button>
          </DialogFooter>
        </form>
      </AlertDialogContent>
    </Dialog>
  );
};

export default AddCategoryDialogue;
