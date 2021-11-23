import { IOrder } from "../@types/store";
import ApiService from "./ApiService";

class OrderApi extends ApiService {
  async create(payload): Promise<Partial<IOrder>> {
    const { data } = await this.service.post('/orders/', payload);
    return data
  }
}

export default new OrderApi;
