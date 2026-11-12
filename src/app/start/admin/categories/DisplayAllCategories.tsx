import React from "react";
import { CategoryTypes } from "@/lib/type";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionButtons from "./ActionButtons";

const DisplayAllCategories = ({
  categories,
}: {
  categories: CategoryTypes[];
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden shadow-xl">
      <Table>
        <TableHeader className="bg-slate-900/80">
          <TableRow className="border-slate-800 hover:bg-transparent">
            <TableHead className="text-xs font-bold text-slate-300 uppercase tracking-wider py-4">
              Category Name
            </TableHead>
            <TableHead className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Slug
            </TableHead>
            <TableHead className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Description
            </TableHead>
            <TableHead className="text-xs font-bold text-slate-300 uppercase tracking-wider text-right pr-6">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((category: CategoryTypes) => (
              <TableRow
                key={category.categorySlug}
                className="border-slate-800/70 hover:bg-slate-900/40 transition-colors"
              >
                {/* Category Name */}
                <TableCell className="font-semibold text-white text-sm py-4">
                  {category.categoryName}
                </TableCell>

                {/* Slug Badge */}
                <TableCell>
                  <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 font-mono text-xs">
                    {category.categorySlug}
                  </span>
                </TableCell>

                {/* Description */}
                <TableCell className="text-xs text-slate-400 max-w-md truncate">
                  {category.categoryDescription || "No description provided."}
                </TableCell>

                {/* Action Buttons */}
                <ActionButtons category={category} />
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-10 text-slate-500 text-sm"
              >
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayAllCategories;
