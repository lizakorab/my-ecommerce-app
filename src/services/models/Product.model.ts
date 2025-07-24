import { Category } from "./Category.model";
import type { Review } from "./Review.model";

export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  thumbnailUrl: string;
  longDescription: string;
  category: Category;
  reviews: Review[];
}
