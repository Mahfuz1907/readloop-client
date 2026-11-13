import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BookOpen, Pencil } from "lucide-react";
import EditForm from "./EditForm";
import { BooksTypes } from "@/lib/type";
import { GetCategories } from "@/lib/actions/adminApi/adminApi";

const BookEditDialogue = async ({ book }: { book: BooksTypes }) => {
  const categories = await GetCategories();
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-8 shrink-0 border-emerald-500/50 bg-emerald-950/50 p-0 text-emerald-400 transition-colors hover:border-emerald-500 hover:bg-emerald-600 hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
        }
      />

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800 text-white shadow-2xl">
        <DialogHeader className="border-b border-slate-800 pb-3">
          <DialogTitle className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <BookOpen className="h-5 w-5" /> Edit Book Details
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-400">
            Update the details for &quot;{book.title}&quot;. Click save when you
            are done.
          </DialogDescription>
        </DialogHeader>

        <EditForm book={book} categories={categories} />
      </DialogContent>
    </Dialog>
  );
};

export default BookEditDialogue;
