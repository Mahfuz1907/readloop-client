"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FolderPlus, Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialogContent } from "@/components/ui/alert-dialog";
import { AddCategoryTypes, CategoryTypes } from "@/lib/type";
import { EditCategory } from "@/lib/actions/adminApi/adminApi";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const EditCategoryDialouge = ({ category }: { category: CategoryTypes }) => {
  const router = useRouter();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleEditCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(
      formData,
    ) as unknown as AddCategoryTypes;
    console.log(userData);
    const result = await EditCategory(userData, category._id);

    if (result.success || result.ok || result.acknowledged) {
      toast.add({
        title: "Success",
        description: "Category update successfull",
      });
      router.refresh();
    } else {
      toast.add({
        title: "Error",
        description: "Category update failed",
      });
    }
  };
  return (
    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
      <Button
        onClick={() => setIsAddOpen(true)}
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 hover:border-slate-800 border-emerald-500/50 bg-emerald-950/50 hover:bg-emerald-600 hover:text-slate-300 text-emerald-400"
      >
        <Pencil className="h-3.5 w-3.5" />
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

        <form onSubmit={handleEditCategory} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-300">
              Category Name
            </Label>
            <Input
              placeholder="e.g. Web Development"
              name="categoryName"
              defaultValue={category.categoryName}
              className="bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-300">Slug</Label>
            <Input
              placeholder="web-development"
              name="categorySlug"
              defaultValue={category.categorySlug}
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
              defaultValue={category.categoryDescription}
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

export default EditCategoryDialouge;
