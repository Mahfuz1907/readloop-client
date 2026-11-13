import { BooksTypes } from "@/lib/type";
import BookEditDialogue from "./BookEditDialogue";
import DeleteDialog from "./DeleteDialogue";

const ActionButtons = ({ book }: { book: BooksTypes }) => {
  return (
    <div className="flex items-center justify-end gap-2">
      <BookEditDialogue book={book} />
      <DeleteDialog book={book} />
    </div>
  );
};

export default ActionButtons;
