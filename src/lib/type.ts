export interface AddCategoryTypes {
  categoryName: string;
  categorySlug: string;
  categoryDescription: string;
}

export interface CategoryTypes {
  _id: string;
  categoryName: string;
  categorySlug: string;
  categoryDescription: string;
}

export interface UserTypes {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}
