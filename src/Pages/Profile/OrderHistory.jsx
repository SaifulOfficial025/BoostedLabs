import React, { useState } from "react";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import ProductCard from "../../Shared/ProductCard";
import ShareYourFeedbackModal from "../../Shared/ShareYourFeedbackModal";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const sampleOrders = [
  { id: 1, status: "Active", price: 550 },
  { id: 2, status: "Cancelled", price: 550 },
  { id: 3, status: "Completed", price: 550 },
  { id: 4, status: "Completed", price: 550 },
];

function OrderHistory() {
  const [filter, setFilter] = useState("All");
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const filtered = sampleOrders.filter((o) =>
    filter === "All"
      ? true
      : filter === "Active"
      ? o.status === "Active"
      : filter === "Delivered"
      ? o.status === "Completed"
      : filter === "Cancelled"
      ? o.status === "Cancelled"
      : true
  );

  const badgeFor = (status) => {
    if (status === "Active")
      return {
        icon: null,
        text: "Active",
        color: "bg-blue-100",
        textColor: "text-blue-700",
      };
    if (status === "Cancelled")
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
      <Noticebar />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-10 font-sans mb-16">
        <div className="flex items-center gap-4 mb-16">
          <Link
            to="/profile"
            className="text-md bg-black text-white px-3 py-1 rounded inline-flex items-center gap-2"
          >
            <FaLongArrowAltLeft /> Back
          </Link>
          <h1 className="text-2xl font-bold">Order History</h1>
        </div>

        <div className="flex gap-3 mb-6">
          {["All", "Active", "Delivered", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {filtered.map((o) => (
            <div key={o.id} className="">
              <ProductCard
                hideActions
                badge={badgeFor(o.status)}
                image={undefined}
                title={"Retatrutide"}
                description={
                  "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only"
                }
                price={o.price}
                onViewDetails={() => navigate(`/shop/product-details/${o.id}`)}
                onAddToCart={() => console.log("order again", o.id)}
              />

              <div className="mt-4">
                {o.status === "Active" && (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-white py-2 rounded-lg"
                  >
                    Rate this product
                  </button>
                )}
                {o.status === "Cancelled" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/shop/product-details/${o.id}`)}
                      className="flex-1 border border-gray-400 py-2 rounded-md"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => console.log("order again", o.id)}
                      className="flex-1 bg-black text-white py-2 rounded-md"
                    >
                      Order again
                    </button>
                  </div>
                )}
                {o.status === "Completed" && (
                  <button
                    onClick={() => {
                      setSelectedOrder(o.id);
                      setFeedbackOpen(true);
                    }}
                    className="w-full bg-black text-white py-2 rounded-lg"
                  >
                    Rate this product
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      <ShareYourFeedbackModal
        open={feedbackOpen}
        onClose={() => {
          setFeedbackOpen(false);
          setSelectedOrder(null);
        }}
        onSubmit={({ rating, feedback }) => {
          // simple handler: log and close (replace with API call as needed)
          console.log("feedback-submitted", {
            orderId: selectedOrder,
            rating,
            feedback,
          });
        }}
      />
    </div>
  );
}

export default OrderHistory;
