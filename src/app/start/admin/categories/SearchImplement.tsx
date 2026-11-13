"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SearchImplement = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";

  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  // Remember what this component wrote to the URL so back/forward navigation
  // can update the input without overwriting text the user is still typing.
  const lastPushed = useRef(searchFromUrl);

  useEffect(() => {
    if (searchFromUrl !== lastPushed.current) {
      lastPushed.current = searchFromUrl;
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }

      const nextQuery = params.toString();
      if (nextQuery === searchParams.toString()) return;

      lastPushed.current = searchQuery;
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, searchParams, pathname, router]);

  return (
    <div className="relative w-full sm:w-72">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        placeholder="Search category..."
        className="pl-9 bg-slate-900 border-slate-800 focus-visible:ring-emerald-600 text-xs sm:text-sm text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchImplement;
