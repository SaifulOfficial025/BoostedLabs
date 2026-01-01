import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import ProductCard from "../../Shared/ProductCard";
import ShareYourFeedbackModal from "../../Shared/ShareYourFeedbackModal";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import {
  fetchOrders,
  confirmDelivery,
  cancelOrder,
  submitReview,
} from "../../Redux/OrderHistory";
import { BASE_URL } from "../../Redux/baseUrl";

function OrderHistory() {
  const [filter, setFilter] = useState("All");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orderHistory);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleConfirmDelivery = async (orderId) => {
    await dispatch(confirmDelivery(orderId));
  };

  const handleCancelOrder = async (orderId) => {
    await dispatch(cancelOrder(orderId));
  };

  const handleSubmitReview = async ({ rating, feedback }) => {
    if (selectedOrderItem) {
      const result = await dispatch(
        submitReview({
          productId: selectedOrderItem.productId,
          rating,
          comment: feedback,
        })
      );

      // Check if the action was rejected (error from backend)
      if (result.type && result.type.endsWith("/rejected")) {
        return { error: result.payload || "Failed to submit review" };
      }

      // Success case
      setFeedbackOpen(false);
      setSelectedOrderItem(null);
      return { message: "Review submitted successfully!" };
    }
  };

  // Map status from API to filter
  const normalizeStatus = (status) => {
    if (status === "Pending") return "Active";
    if (status === "Delivered") return "Delivered";
    if (status === "Cancelled") return "Cancelled";
    return "Active";
  };

  const filtered = orders.filter((o) => {
    const normalizedStatus = normalizeStatus(o.status);
    if (filter === "All") return true;
    if (filter === "Active") return normalizedStatus === "Active";
    if (filter === "Delivered") return normalizedStatus === "Delivered";
    if (filter === "Cancelled") return normalizedStatus === "Cancelled";
    return true;
  });

  const badgeFor = (status) => {
    const normalizedStatus = normalizeStatus(status);
    if (normalizedStatus === "Active")
      return {
        icon: null,
        text: "Active",
        color: "bg-blue-100",
        textColor: "text-blue-700",
      };
    if (normalizedStatus === "Cancelled")
      return {
        icon: null,
        text: "Cancelled",
        color: "bg-red-100",
        textColor: "text-red-600",
      };
    return {
      icon: null,
      text: "Completed",
      color: "bg-green-100",
      textColor: "text-green-700",
    };
  };

  return (
    <div>
      <Header />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-8 mt-10 font-sans mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 sm:mb-16">
          <Link
            to="/profile"
            className="text-md bg-black text-white px-3 py-1 rounded inline-flex items-center gap-2 w-fit"
          >
            <FaLongArrowAltLeft /> Back
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">Order History</h1>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Active", "Delivered", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm sm:text-base ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-10 items-start">
          {loading && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-600">Loading orders...</p>
            </div>
          )}
          {!loading && error && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-red-600">Error: {error}</p>
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-600">No orders found</p>
            </div>
          )}
          {!loading &&
            !error &&
            filtered.map((order) => {
              // Get first item for display (orders can have multiple items)
              const firstItem = order.items && order.items[0];
              if (!firstItem) return null;

              const product = firstItem.product;
              const imageUrl = product.logo
                ? `${BASE_URL}${product.logo}`
                : product.images && product.images.length > 0
                ? product.images[0]
                : undefined;
              const normalizedStatus = normalizeStatus(order.status);

              return (
                <div key={order.id} className="w-full flex flex-col h-full">
                  <ProductCard
                    hideActions
                    badge={badgeFor(order.status)}
                    image={imageUrl}
                    title={product.name}
                    description={
                      product.description || "No description available"
                    }
                    price={parseFloat(order.total_price)}
                    onViewDetails={() =>
                      navigate(`/product-details/${product.id}`)
                    }
                    onAddToCart={() => console.log("order again", order.id)}
                  />
                  <div className="mt-3 sm:mt-4 flex flex-col gap-2 w-full">
                    {normalizedStatus === "Active" && (
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <button
                          onClick={() => handleConfirmDelivery(order.id)}
                          className="flex-1 bg-black text-white py-2 px-2 text-sm sm:text-base rounded-md hover:bg-[#70c41d] transition"
                        >
                          Mark as Delivered
                        </button>
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex-1 bg-[#fe6464] text-white py-2 px-2 text-sm sm:text-base rounded-md hover:bg-red-700 transition"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                    {normalizedStatus === "Cancelled" && (
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <button
                          onClick={() =>
                            navigate(`/product-details/${product.id}`)
                          }
                          className="flex-1 border border-gray-400 py-2 px-2 text-sm sm:text-base rounded-md"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => console.log("order again", order.id)}
                          className="flex-1 bg-black text-white py-2 px-2 text-sm sm:text-base rounded-md"
                        >
                          Order again
                        </button>
                      </div>
                    )}
                    {normalizedStatus === "Delivered" && (
                      <button
                        onClick={() => {
                          setSelectedOrderItem({
                            orderId: order.id,
                            productId: product.id,
                            productName: product.name,
                          });
                          setFeedbackOpen(true);
                        }}
                        className="w-full bg-black text-white py-2 px-2 text-sm sm:text-base rounded-lg"
                      >
                        Rate this product
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <Footer />

      <ShareYourFeedbackModal
        open={feedbackOpen}
        onClose={() => {
          setFeedbackOpen(false);
          setSelectedOrderItem(null);
        }}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}

export default OrderHistory;
