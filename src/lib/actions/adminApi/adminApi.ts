import { AddCategoryTypes } from "@/lib/type";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// get all users
export const GetUsers = async (role: string) => {
  const res = await fetch(`${BASE_URL}/users/role/${role}`);
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
export const GetCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
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
