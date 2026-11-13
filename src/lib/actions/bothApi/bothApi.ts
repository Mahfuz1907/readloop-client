import { BooksTypes } from "@/lib/type";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// get all books
export const GetBooks = async (query = ""): Promise<BooksTypes[]> => {
  const res = await fetch(`${BASE_URL}/books?${query}`);
  const result = await res.json();
  return result;
};

// get featured books
export const GetFeaturedBooks = async (): Promise<BooksTypes[]> => {
  const res = await fetch(`${BASE_URL}/featured-books`);
  const result = await res.json();
  return result;
};
