import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import SmallProductComponentWithVolumeModificationandPrice from "../../Shared/SmallProductComponentWithVolumeModificationandPrice";

const initialProducts = [
  {
    id: 1,
    image: "/product-weightloss.png",
    badge: "WEIGHT LOSS",
    title: "Retatrutide",
    price: 215,
    quantity: 1,
  },
  {
    id: 2,
    image: "/product-weightloss.png",
    badge: "WEIGHT LOSS",
    title: "Retatrutide",
    price: 215,
    quantity: 1,
  },
  {
    id: 3,
    image: "/product-weightloss.png",
    badge: "WEIGHT LOSS",
    title: "Retatrutide",
    price: 215,
    quantity: 1,
  },
];

function RecurringProductModal({ open = true, onClose }) {
  const [products, setProducts] = useState(initialProducts);
  const [selected, setSelected] = useState([]);
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
  const handleRemove = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelected((prev) => prev.filter((sid) => sid !== id));
  };
  const handleQtyChange = (id, qty) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: qty } : p))
    );
  };

  return (
    open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
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
          <div className="px-6 py-4">
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
              >
                <MdDelete />
              </button>
            </div>
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
                      image={item.image}
                      badge={item.badge}
                      title={item.title}
                      price={item.price}
                      quantity={item.quantity}
                      onDecrease={() =>
                        handleQtyChange(item.id, Math.max(1, item.quantity - 1))
                      }
                      onIncrease={() =>
                        handleQtyChange(item.id, item.quantity + 1)
                      }
                      onRemove={() => handleRemove(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-100">
            <button
              className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold text-lg"
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
