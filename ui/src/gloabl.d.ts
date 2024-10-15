export {};

declare global {
  interface ApiResponse {
    status: {
      code: number;
      message: string;
    };
  }

  interface UserType {
    id: string;
    email: string;
    name: string;
  }

  interface ProductType {
    id: string;
    name: string;
    description: string;
    price: number;
    user_id: string;
    stock_quantity: number;
    image_url: string
    raw_price: {
      cents: number,
      currency_iso: string;
    };
  }

  interface DataResponse {
    id: string;
    type: string;
  }
}