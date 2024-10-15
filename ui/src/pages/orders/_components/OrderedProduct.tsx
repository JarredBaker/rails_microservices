import React from "react";
import GeneralHelper from "../../../helpers/generalHelper";

interface ProductResponse extends DataResponse {
  attributes: ProductType;
}

interface OrderResponse extends DataResponse {
  attributes: {
    id: string;
    user_id: string;
    product_id: string;
    quantity: number;
    status: string;
    products: ProductResponse[]
  }
}

type OrderData = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  status: string;
}

const OrderedProduct: React.FC<OrderResponse> = (params) => {
  const product: ProductType = params.attributes.products[0].attributes;
  const order: OrderData = params.attributes;

  return (
    <div className={"text-wrap"}>
      {params && (
        <button className={"text-left"}>
          <img className={"object-cover h-48 w-96"} src={product.image_url + "?type='product'"}/>
          <div className={"flex flex-row justify-between p-3"}>
            <h1 className={"text-xl font-bold"}>{product.name}</h1>
            <p>Amount ordered: {order.quantity}</p>
            <p className={"text-xl font-bold"}>{GeneralHelper.calculateTotal((Number(product.raw_price.cents) * Number(order.quantity)), 'USD')}</p>
          </div>
        </button>
      )}
    </div>
  )
}

export default OrderedProduct;