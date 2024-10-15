import {AxiosResponse} from 'axios';
import api from "./baseApi";

interface ProductData extends DataResponse {
  attributes: ProductType
}

interface ProductApiResponse extends ApiResponse {
  data: ProductData[];
}

const ProductApiService = {
  listProducts(): Promise<AxiosResponse<ProductApiResponse>> {
    return api.get('/products/products');
  },
};

export default ProductApiService;