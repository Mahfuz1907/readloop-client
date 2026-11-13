"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { BooksTypes } from "@/lib/type";
import { useRouter } from "next/navigation";
import { DeleteBook } from "@/lib/actions/adminApi/adminApi";
import { toast } from "@/components/ui/toast";

export default function DeleteDialog({ book }: { book: BooksTypes }) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleDelete = async () => {
    const result = await DeleteBook(book._id);

    if (result.success || result.ok || result.acknowledged) {
      toast.add({
        type: "success",
        description: "Book Delete Successfull",
      });
      router.refresh();
    } else {
      toast.add({
        type: "error",
        description: "Book Delete Failed",
      });
      router.refresh();
    }
  };

  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
      <Button
        type="button"
        onClick={() => setIsDeleteOpen(true)}
        variant="outline"
        size="sm"
        className="h-8 w-8 shrink-0 border-rose-500/50 bg-rose-950/50 p-0 text-rose-400 transition-colors hover:border-rose-500 hover:bg-rose-600 hover:text-white focus-visible:ring-2 focus-visible:ring-rose-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>

      <AlertDialogContent className="bg-slate-950 border-slate-800 text-white shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-rose-400 font-bold text-base sm:text-lg">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400 text-xs sm:text-sm">
            This action cannot be undone. This will permanently delete &quot;
            <span className="text-white font-medium">{book.title}</span>&quot;
            and remove its data from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel className="bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white text-xs">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
