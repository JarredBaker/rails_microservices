import React, {useEffect, useState} from "react";
import AuthedHeader from "../../components/AuthedHeader";
import NoOrders from "./_components/NoOrders";
import Loading from "../../components/Loading";
import GeneralHelper from "../../helpers/generalHelper";
import OrderApiService from "../../api/orderApi";
import OrderedProduct from "./_components/OrderedProduct";

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

const YourOrders: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [noOrders, setNoOrders] = useState<boolean>(false);
  const [orders, setOrders] = useState<OrderResponse[]>();

  const getProducts = async (): Promise<void> => {
    await OrderApiService.getUserOrders().then((res) => {
      if (res.status === 200) setOrders([...res.data.data]);
    }).catch((error) => {
      if (error.response?.data?.status?.code === 401 && error.response?.data?.status?.message?.includes('Invalid token')) GeneralHelper.callLogout();
      console.error("HERE " + JSON.stringify(error));
    })
  }

  useEffect((): void => {
    getProducts().then(r => {
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    })
  }, []);

  return (
    <main className={"min-h-screen"}>
      <AuthedHeader/>
      <Loading loading={loading} name={"orders"}>
        {noOrders && <NoOrders/>}

        {!noOrders && orders && (
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 grid grid-cols-3">
            {orders.map(order => {
              return (
                <div key={order.id}>
                  <p>{order.attributes.status}</p>
                  {order.attributes.products && (
                    order.attributes.products.map(product => {
                      return <OrderedProduct key={product.id} {...order} />
                    })
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Loading>
    </main>
  )
}

export default YourOrders;