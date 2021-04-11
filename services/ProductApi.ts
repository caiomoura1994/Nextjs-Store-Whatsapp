import { IProduct } from "../@types/store";
import ApiService from "./ApiService";

class ProductApi extends ApiService {
  async get(productId: string): Promise<Partial<IProduct>> {
    const { data } = await this.service.get(`/product/${productId}/`);
    return data
  }
  
  async listByCategory(categoryId: string): Promise<Partial<IProduct>> {
    const { data } = await this.service.get(`/product-filter/?categories=${categoryId}`);
    return data
  }
}

export default new ProductApi;
