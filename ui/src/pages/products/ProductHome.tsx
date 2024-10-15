import React, {useEffect, useState} from 'react';
import ProductApiService from "../../api/productApi";
import Product from "./_components/Product";
import OrderModal from "../orders/OrderModal";
import GeneralHelper from "../../helpers/generalHelper";
import AuthedHeader from "../../components/AuthedHeader";
import Loading from "../../components/Loading";

interface ProductResponse extends DataResponse {
  attributes: ProductType
}

const ProductHome: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>();
  const [productFocus, setProductFocus] = useState<ProductType>();
  const [loading, setLoading] = useState<boolean>(true);

  const getProducts = async (): Promise<void> => {
    await ProductApiService.listProducts().then((res) => {
      console.log(res.data.data)
      if (res.status === 200) setProducts([...res.data.data]);
    }).catch((error) => {
      if (error.response?.data?.status?.code === 401 && error.response?.data?.status?.message?.includes('Invalid token')) GeneralHelper.callLogout();
      console.error(JSON.stringify(error));
    })
  }

  useEffect((): void => {
    getProducts().then(r => {
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    })
  }, []);

  const setProduct = (product: ProductResponse): void => {
    setProductFocus(product["attributes"]);
  }

  const clearFocusedProduct = (): void => {
    setProductFocus(undefined);
  }

  return (
    <>
      <div className="min-h-full">
        <AuthedHeader/>

        <Loading loading={loading} name={"products"}>

          <div className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <p className="text-xl font-bold tracking-tight text-gray-900">Products</p>
            </div>
          </div>

          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-3">
              {
                products?.map((product) => {
                  return <Product key={product.id} {...product["attributes"]} onClickProduct={() => setProduct(product)}/>
                })
              }

              {productFocus && (
                <OrderModal {...productFocus} clearModal={clearFocusedProduct}/>
              )}
            </div>
          </main>
        </Loading>
      </div>
    </>
  )
}

export default ProductHome;