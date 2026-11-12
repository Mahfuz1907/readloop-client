import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { CategoryTypes } from "@/lib/type";
import { Trash2 } from "lucide-react";
import React from "react";
import EditCategoryDialouge from "./EditCategoryDialouge";
import DeleteDialogue from "./DeleteDialogue";

const ActionButtons = ({ category }: { category: CategoryTypes }) => {
  return (
    <TableCell className="text-right pr-6">
      <div className="flex items-center justify-end gap-2">
        {/* Edit Button */}
        <EditCategoryDialouge category={category} />

        {/* Delete Button */}
        <DeleteDialogue category={category} />
      </div>
    </TableCell>
  );
};

export default ActionButtons;
