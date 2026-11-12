const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// get all books
export const GetBooks = async () => {
  const res = await fetch(`${BASE_URL}/books`);
  const result = await res.json();
  return result;
};

// get featured books
export const GetFeaturedBooks = async () => {
  const res = await fetch(`${BASE_URL}/featured-books`);
  const result = await res.json();
  return result;
};
