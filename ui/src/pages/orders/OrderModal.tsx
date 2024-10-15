import React, {MouseEventHandler, useEffect, useRef, useState} from "react";
import OrderApiService from "../../api/orderApi";
import Loading from "../../components/Loading";
import GeneralHelper from "../../helpers/generalHelper";

interface ProductParams extends ProductType {
  clearModal: MouseEventHandler<SVGSVGElement>;
}

type OrderData = {
  product_id: string;
  quantity: number;
}

const OrderModal: React.FC<ProductParams> = (params) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<number>(0);

  const [order, setOrder] = useState<OrderData>({
    product_id: params.id,
    quantity: 1
  });

  const increaseAmount = (): void => {
    if (order.quantity < params.stock_quantity) setOrder({...order, quantity: order.quantity + 1});
  }

  const decreaseAmount = (): void => {
    if (order.quantity > 1) setOrder({...order, quantity: order.quantity - 1});
  }

  const handleClickOutside = (event: MouseEvent): void => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      if (svgRef.current) svgRef.current.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        buttons: 1,
      }));
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);

  const placeOrder = async (): Promise<void> => {
    setLoading(true);

    await OrderApiService.placeOrders({order: order}).then((res) => {
      if (res.status === 200 || res.status === 201) setOrderStatus(1);
      setLoading(false);
    }).catch((error) => {
      setOrderStatus(2);
      setLoading(false);

      if (error.response?.data?.status?.code === 401 && error.response?.data?.status?.message?.includes('Invalid token')) GeneralHelper.callLogout();
    });
  }

  return (
    <div className={"fixed inset-0 z-30 min-h-screen min-w-screen bg-slate-500 bg-opacity-45"}>
      <div className={"absolute z-40 right-0 top-0 min-h-screen w-1/3 bg-white shadow-2xl flex flex-col"}>
        <div className={"bg-amber-50 px-6 py-4 flex flex-row justify-between"}>
          <p className={"text-2xl font-bold"}>Order: {params.name}</p>
          <svg ref={svgRef} onClick={params.clearModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </div>
        <div className={"p-6 text-wrap min-h-full flex flex-col"} ref={modalRef}>
          <Loading name={"order placement"} loading={loading}>
            {orderStatus === 1 && (
              <div className={"bg-green-300 w-full p-3 rounded mb-4"}>
                <p>Order placed successfully!</p>
              </div>
            )}

            {orderStatus === 2 && (
              <div className={"bg-red-300 w-full p-3 rounded mb-4"}>
                <p>Something went wrong. Please try again later.</p>
              </div>
            )}

            <img className={"object-cover h-96 w-full"} src={params.image_url + "?type='product'"}/>
            <div className={"flex flex-row justify-between py-3"}>
              <p className={"text-2xl font-bold"}>{params.name}</p>
              <p className={"text-xl font-bold"}>{params.price}</p>
            </div>
            <p>{params.description}</p>
            <div className={"flex flex-row justify-between py-3 bottom-0"}>
              <p>Available: {params.stock_quantity}</p>
              <p>Sub total: {GeneralHelper.calculateTotal((Number(params.raw_price.cents) * Number(order.quantity)), params.raw_price.currency_iso)}</p>
              <div className={"flex flex-row"}>
                {params.stock_quantity > 0 ? (
                  <>
                    <div className={"flex flex-row align-middle h-10 items-center rounded bg-slate-200 mr-3"}>
                      <button onClick={decreaseAmount} className={"mx-3"}>-</button>
                      <p className={""}>{order.quantity}</p>
                      <button onClick={increaseAmount} className={"mx-3"}>+</button>
                    </div>
                    <button className={"rounded px-4 py-2 bg-cyan-400"} onClick={placeOrder}>Place order</button>
                  </>
                ) : (
                  <p>Out of stock</p>
                )}
              </div>
            </div>
          </Loading>
        </div>
      </div>
    </div>
  )
}

export default OrderModal;