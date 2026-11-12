"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { DeleteCategory } from "@/lib/actions/adminApi/adminApi";
import { CategoryTypes } from "@/lib/type";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteDialogue = ({ category }: { category: CategoryTypes }) => {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleDeleteConfirm = async () => {
    const result = await DeleteCategory(category._id);

    if (result.success || result.ok || result.acknowledged) {
      toast.add({
        title: "Success",
        description: "Category deletion successfull",
      });
      router.refresh();
    } else {
      toast.add({
        title: "Error",
        description: "Category deletion failed",
      });
      router.refresh();
    }
  };
  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <Button
        variant="outline"
        onClick={() => setIsDeleteOpen(true)}
        size="sm"
        className="h-8 w-8 p-0 hover:border-slate-800 border-rose-500/50 bg-rose-950/50 hover:bg-rose-600 hover:text-slate-300 text-rose-400"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>

      <AlertDialogContent className="bg-slate-950 border-slate-800 text-white sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold flex items-center gap-2 text-white">
            <div className="p-2 bg-rose-950/60 border border-rose-800/50 rounded-lg text-rose-400">
              <Trash2 className="h-5 w-5" />
            </div>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs text-slate-400 pt-1">
            This action cannot be undone. This will permanently delete the
            category
            <span className="text-emerald-400 font-semibold px-1">
              {category.categoryName}
            </span>
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="pt-4">
          <AlertDialogCancel className="bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white text-xs">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => handleDeleteConfirm()}
            className="bg-rose-600 hover:bg-rose-500 border-rose-500 text-white font-medium text-xs shadow-md shadow-rose-600/20"
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialogue;
