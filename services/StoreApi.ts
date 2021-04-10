import { IStore } from "../@types/store";
import ApiService from "./ApiService";

class StoreApi extends ApiService {
  async getBySlug(slug: string): Promise<Partial<IStore>> {
    const { data } = await this.service.get(`/store/${slug}/`)
    return data
  }
}

export default new StoreApi;
