import { AddBooksTypes, AddCategoryTypes, CategoryTypes } from "@/lib/type";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// get all users
export const GetUsers = async (search = "") => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);

  const query = params.toString();

  const res = await fetch(`${BASE_URL}/users${query ? `?${query}` : ""}`);
  const result = await res.json();
  return result;
};

// delete user
export const DeleteUsers = async (id: string) => {
  const res = await fetch(`${BASE_URL}/users/delete/${id}`, {
    method: "DELETE",
  });
  const result = await res.json();
  return result;
};

// Add category
export const AddCategory = async (data: AddCategoryTypes) => {
  const res = await fetch(`${BASE_URL}/add-category`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  const result = await res.json();
  return result;
};

// get all categories
export const GetCategories = async (search = ""): Promise<CategoryTypes[]> => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);

  const query = params.toString();
  const res = await fetch(`${BASE_URL}/categories${query ? `?${query}` : ""}`);
  const result = await res.json();
  return result;
};

// edit category
export const EditCategory = async (data: AddCategoryTypes, id: string) => {
  const res = await fetch(`${BASE_URL}/categories/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });
  const result = res.json();
  return result;
};

// delete category
export const DeleteCategory = async (id: string) => {
  const res = await fetch(`${BASE_URL}/categories/delete/${id}`, {
    method: "DELETE",
  });
  const result = res.json();
  return result;
};

// add book
export const AddBook = async (data: AddBooksTypes) => {
  const res = await fetch(`${BASE_URL}/add-book`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};

// edit book
export const EditBook = async (data: AddBooksTypes, id: string) => {
  const res = await fetch(`${BASE_URL}/books/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  const result = await res.json();
  return result;
};

// delete book
export const DeleteBook = async (id: string) => {
  const res = await fetch(`${BASE_URL}/books/delete/${id}`, {
    method: "DELETE",
  });
  const result = res.json();
  return result;
};
