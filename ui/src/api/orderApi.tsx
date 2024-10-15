import {AxiosResponse} from 'axios';
import api from "./baseApi";

interface OrderParams {
  order: {
    product_id: string;
    quantity: number;
  };
}
interface ProductResponse extends DataResponse {
  attributes: ProductType;
}

interface OrderData extends DataResponse {
  attributes: {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    status: string;
    products: ProductResponse[]
  }
}

interface OrderApiResponse extends DataResponse {
  data: OrderData[];
}

const OrderApiService = {

  getUserOrders(): Promise<AxiosResponse<OrderApiResponse>> {
    return api.get('/orders/orders');
  },

  placeOrders(order: OrderParams): Promise<AxiosResponse<OrderApiResponse>> {
    return api.post('/orders/orders', order);
  },
};

export default OrderApiService;