import { Button } from "@/components/ui/button";
import { BooksTypes } from "@/lib/type";
import { Trash2 } from "lucide-react";
import React from "react";
import BookEditDialogue from "./BookEditDialogue";

const ActionButtons = ({ book }: { book: BooksTypes }) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <BookEditDialogue book={book} />
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label={`Delete ${book.title}`}
        title="Delete book"
        className="h-8 w-8 shrink-0 border-rose-500/50 bg-rose-950/50 p-0 text-rose-400 transition-colors hover:border-rose-500 hover:bg-rose-600 hover:text-white focus-visible:ring-2 focus-visible:ring-rose-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

export default ActionButtons;
