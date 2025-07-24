import products from "@/assets/products.json";
import type { Product } from "@/services/models/Product.model";

export default class ProductService {
  static getList(page = 0, count = 0): Product[] {
    return products;
  }

  // not used since products are preloaded
  static async getById(id: string): Product {
    return products.find((product: Product) => product.id === id);
  }
}
