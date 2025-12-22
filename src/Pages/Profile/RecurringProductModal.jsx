import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import SmallProductComponentWithVolumeModificationandPrice from "../../Shared/SmallProductComponentWithVolumeModificationandPrice";
import {
  fetchRecurringProducts,
  updateRecurringProductQuantity,
  deleteMultipleRecurringProducts,
} from "../../Redux/RecurringProduct";

function RecurringProductModal({ open = true, onClose }) {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.recurringProduct);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (open) {
      dispatch(fetchRecurringProducts());
    }
  }, [open, dispatch]);

  const allSelected =
    selected.length === products.length && products.length > 0;

  const handleSelectAll = () => {
    setSelected(allSelected ? [] : products.map((p) => p.id));
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleRemoveSelected = () => {
    if (selected.length > 0) {
      dispatch(deleteMultipleRecurringProducts(selected));
      setSelected([]);
    }
  };

  const handleQtyChange = (id, action) => {
    dispatch(updateRecurringProductQuantity({ id, action }));
  };

  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4">
        <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-0 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-lg font-semibold text-gray-800">
              Recurring product list
            </span>
            <button
              onClick={onClose}
              className="text-2xl text-gray-400 hover:text-red-500 transition-all"
            >
              &times;
            </button>
          </div>
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="form-checkbox h-5 w-5"
              />
              <span className="text-gray-800 text-sm">Select All</span>
              <button
                className="ml-auto text-gray-400 hover:text-red-500"
                title="Delete selected"
                disabled={selected.length === 0}
                onClick={handleRemoveSelected}
              >
                <MdDelete />
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-gray-500">Loading...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-gray-500">No recurring products found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(item.id)}
                      onChange={() => handleSelect(item.id)}
                      className="form-checkbox h-5 w-5"
                    />
                    <div className="flex-1">
                      <SmallProductComponentWithVolumeModificationandPrice
                        checked={selected.includes(item.id)}
                        onCheck={() => handleSelect(item.id)}
                        image={item.image || "/product-weightloss.png"}
                        badge={item.status || "Active"}
                        title={item.product_name || `Product ${item.product}`}
                        price={item.price || 0}
                        quantity={item.quantity}
                        onDecrease={() => handleQtyChange(item.id, "decrement")}
                        onIncrease={() => handleQtyChange(item.id, "increment")}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="px-4 sm:px-6 py-4 bg-gray-100">
            <button
              className="w-full bg-gray-400 text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg disabled:opacity-50"
              disabled
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default RecurringProductModal;
