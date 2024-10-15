import React, {MouseEventHandler} from "react";

interface ProductParams extends ProductType {
  onClickProduct: MouseEventHandler<HTMLButtonElement>;
}

const Product: React.FC<ProductParams | undefined> = (params) => {
  return (
    <div className={"text-wrap"}>
      {params && (
        <button onClick={params.onClickProduct} className={"text-left"}>
          <img className={"object-cover h-48 w-96"} src={params.image_url + "?type='product'"} alt={""}/>
          <div className={"flex flex-row justify-between p-3"}>
            <h1 className={"text-xl font-bold"}>{params.name}</h1>
            <p className={"text-xl font-bold"}>{params.price}</p>
          </div>
          <p className={"px-3"}>{params.description}</p>
          <p className={"px-3"}>{params.stock_quantity > 0 ? params.stock_quantity : "Out of stock"}</p>
        </button>
      )}
    </div>
  )
}

export default Product;