import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios";
import { toast } from "react-toastify";

const statusSteps = ["pending", "paid", "shipped", "delivered"];

const statusLabels = {
  pending: "Order Confirmed",
  paid: "Payment Verified",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const TrackOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(orderId || "");
  const [isMobileView, setIsMobileView] = useState(false);
  const [showTrackingOnMobile, setShowTrackingOnMobile] = useState(false);
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleViewportChange = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobileView(mobile);
      if (!mobile) {
        setShowTrackingOnMobile(true);
      }
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);

    return () => {
      window.removeEventListener("resize", handleViewportChange);
    };
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/cart/orders`);
        const fetchedOrders = response?.data?.orders || [];
        setOrders(fetchedOrders);

        if (fetchedOrders.length === 0) {
          setError("No orders found for this account.");
          return;
        }

        const hasRequestedOrder = orderId
          ? fetchedOrders.some((singleOrder) => singleOrder.orderId === orderId)
          : false;

        if (hasRequestedOrder) {
          setSelectedOrderId(orderId);
        } else {
          setSelectedOrderId(fetchedOrders[0].orderId);
        }
      } catch (err) {
        setError(err?.response?.data?.msg || "Unable to fetch order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orderId]);

  const order = useMemo(() => {
    if (!orders.length) {
      return null;
    }
    return (
      orders.find((singleOrder) => singleOrder.orderId === selectedOrderId) ||
      orders[0]
    );
  }, [orders, selectedOrderId]);

  const activeStepIndex = useMemo(() => {
    if (!order?.status) {
      return 0;
    }
    const idx = statusSteps.indexOf(order.status);
    return idx >= 0 ? idx : 0;
  }, [order]);

  const canCancelOrder = useMemo(() => {
    if (!order?.status) {
      return false;
    }
    return ["pending", "paid"].includes(order.status);
  }, [order]);

  const handleCancelOrder = async () => {
    if (!order?.orderId || !canCancelOrder) {
      return;
    }

    setShowCancelDialog(true);
  };

  const confirmCancelOrder = async () => {
    if (!order?.orderId || !canCancelOrder) {
      return;
    }

    try {
      setIsCancellingOrder(true);
      const response = await api.patch(`/cart/order/${order.orderId}/cancel`);
      const updatedOrder = response?.data?.order;

      setOrders((prevOrders) =>
        prevOrders.map((singleOrder) =>
          singleOrder.orderId === order.orderId
            ? { ...singleOrder, ...updatedOrder }
            : singleOrder,
        ),
      );

      toast.success("Order cancelled successfully");
      setShowCancelDialog(false);
    } catch (cancelError) {
      toast.error(
        cancelError?.response?.data?.msg || "Unable to cancel this order",
      );
    } finally {
      setIsCancellingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center w-full max-w-lg">
          <p className="text-gray-700 font-medium">Loading order tracking...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center w-full max-w-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-sm text-gray-600 mb-4">{error || "No order details available."}</p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          className={`bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:col-span-1 h-fit ${
            isMobileView && showTrackingOnMobile ? "hidden" : "block"
          }`}
        >
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Order History</h2>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {orders.map((singleOrder) => {
              const isActive = singleOrder.orderId === order.orderId;
              return (
                <button
                  key={singleOrder.orderId}
                  onClick={() => {
                    setSelectedOrderId(singleOrder.orderId);
                    if (isMobileView) {
                      setShowTrackingOnMobile(true);
                    }
                    navigate(`/track-order/${singleOrder.orderId}`, { replace: true });
                  }}
                  className={`w-full text-left border rounded-md p-3 transition ${
                    isActive
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {singleOrder.items?.[0]?.product?.images?.[0] ? (
                      <img
                        src={singleOrder.items[0].product.images[0]}
                        alt={singleOrder.items?.[0]?.product?.name || "Order Product"}
                        className="w-14 h-14 rounded-md object-cover bg-gray-100 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-md bg-gray-200 shrink-0 flex items-center justify-center text-[10px] text-gray-600">
                        No Image
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{singleOrder.orderId}</p>
                      <p className="text-xs text-gray-600">{new Date(singleOrder.createdAt).toLocaleString()}</p>
                      <p className="text-xs text-gray-700 mt-1">Status: {statusLabels[singleOrder.status] || singleOrder.status}</p>
                      <p className="text-xs text-gray-700">INR {Number(singleOrder.totalAmount || 0).toFixed(2)}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`lg:col-span-2 space-y-4 sm:space-y-6 ${
            isMobileView && !showTrackingOnMobile ? "hidden" : "block"
          }`}
        >
        {isMobileView && (
          <button
            onClick={() => setShowTrackingOnMobile(false)}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Back to Order History
          </button>
        )}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Track Your Order</h1>
          <p className="text-sm text-gray-600 mt-1">Order ID: {order.orderId}</p>
          <p className="text-sm text-gray-600">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
          <p className="text-sm text-gray-600">Payment Method: {order.paymentMethod}</p>
          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2">
            Total: INR {Number(order.totalAmount || 0).toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Order Timeline</h2>
          <div className="space-y-4">
            {statusSteps.map((step, index) => {
              const completed = index <= activeStepIndex && order.status !== "cancelled";
              return (
                <div key={step} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      completed ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className={`font-medium ${completed ? "text-gray-900" : "text-gray-500"}`}>
                      {statusLabels[step]}
                    </p>
                    {index === activeStepIndex && (
                      <p className="text-xs text-green-700">Current Status</p>
                    )}
                  </div>
                </div>
              );
            })}
            {order.status === "cancelled" && (
              <p className="text-sm font-medium text-red-600">This order has been cancelled.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Shipping Address</h2>
          <p className="text-sm text-gray-700">{order.shippingAddress?.fullName}</p>
          <p className="text-sm text-gray-700">{order.shippingAddress?.phone}</p>
          <p className="text-sm text-gray-700">
            {[
              order.shippingAddress?.addressLine1,
              order.shippingAddress?.addressLine2,
              order.shippingAddress?.city,
              order.shippingAddress?.state,
              order.shippingAddress?.pincode,
              order.shippingAddress?.country,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Items</h2>
          <div className="space-y-3">
            {order.items?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border border-gray-100 rounded-md p-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name || "Item"}
                    className="w-14 h-14 rounded-md object-cover bg-gray-100"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.product?.name || "Product"}</p>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800">
                  INR {Number(item.priceAtPurchase * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {canCancelOrder && (
            <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleCancelOrder}
                disabled={isCancellingOrder}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-60"
              >
                {isCancellingOrder ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          )}
        </div>
        </div>
      </div>

      {showCancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900">Cancel Order</h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to cancel this order?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowCancelDialog(false)}
                disabled={isCancellingOrder}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 disabled:opacity-60"
              >
                No
              </button>
              <button
                onClick={confirmCancelOrder}
                disabled={isCancellingOrder}
                className="px-4 py-2 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-60"
              >
                {isCancellingOrder ? "Cancelling..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
