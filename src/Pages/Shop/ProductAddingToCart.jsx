import React, { useState } from "react";
import { FaStar, FaShareAlt } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import ShoppingCartModal from "../../Shared/ShoppingCartModal";
import SizeandColor from "./SizeandColor";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Redux/Cart";
import { BASE_URL } from "../../Redux/baseUrl";
import { addToGuestCart, getGuestCart } from "../../utils/guestCart";

function ProductAddingToCart({
  product,
  stats,
  image,
  title = "Retatrutide",
  rating = 4.5,
  reviews = 17,
  price = 215,
  oldPrice = 290,
  badge = "ENERGY",
  onAdd = () => {},
}) {
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";

  // Get all images (logo + product images)
  const allImages = [
    product?.logo ? { id: 0, image: product.logo, isLogo: true } : null,
    ...(product?.images || []),
  ].filter(Boolean);

  // Initialize the main image URL
  const initialImageUrl = product?.logo
    ? product.logo.startsWith("http")
      ? product.logo
      : `${BASE_URL}${product.logo}`
    : null;

  // State for selected image
  const [selectedImageUrl, setSelectedImageUrl] = useState(initialImageUrl);

  // Use product data from props, with fallbacks
  const productImage =
    selectedImageUrl ||
    product?.logo ||
    product?.images?.[0]?.image ||
    image ||
    `${base}dummyproduct.png`;
  const productTitle = product?.name || title;
  const productPrice = product?.discounted_price || price;
  const productOldPrice = product?.initial_price || oldPrice;
  const productBadge =
    product?.type?.name?.toUpperCase() ||
    product?.category?.toUpperCase() ||
    badge;
  const hasRealStats =
    stats &&
    typeof stats.average_rating === "number" &&
    typeof stats.total_reviews === "number" &&
    stats.total_reviews > 0;
  const averageRating = hasRealStats ? stats.average_rating : null;
  const totalReviews = hasRealStats ? stats.total_reviews : null;

  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state) => state.cart);
  const [showCart, setShowCart] = useState(false);
  const [cartItemId, setCartItemId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const isLoggedIn = !!localStorage.getItem("auth");

  // Find cart item for this product
  const cartItem = cartItems.find(
    (item) => item.product && product && item.product.id === product.id
  );
  const qty = cartItem ? cartItem.quantity : 1;
  // Keep cartItemId in sync with cart
  React.useEffect(() => {
    if (cartItem && cartItem.id !== cartItemId) {
      setCartItemId(cartItem.id);
    }
  }, [cartItem, cartItemId]);

  // Add to cart handler
  const handleAddToCart = async () => {
    if (!product?.id) return;

    // For merchandise, validate size and color selection if they are available
    if (product?.category === "Merchandise") {
      if (product?.available_sizes?.length > 0 && !selectedSize) {
        // Size is available but not selected
        alert("Please select a size");
        return;
      }
      if (product?.available_colors?.length > 0 && !selectedColor) {
        // Color is available but not selected
        alert("Please select a color");
        return;
      }
    }

    try {
      if (isLoggedIn) {
        // Find the selected color name if color is selected
        let colorName = null;
        if (selectedColor && product?.available_colors) {
          const colorObj = product.available_colors.find(
            (c) => c.hex === selectedColor
          );
          colorName = colorObj?.name || null;
        }

        await dispatch(
          addToCart({
            productId: product.id,
            quantity: qty,
            size: selectedSize,
            color_hex: selectedColor,
            color_name: colorName,
          })
        ).unwrap();
      } else {
        // Guest cart - add to localStorage
        let colorName = null;
        if (selectedColor && product?.available_colors) {
          const colorObj = product.available_colors.find(
            (c) => c.hex === selectedColor
          );
          colorName = colorObj?.name || null;
        }

        addToGuestCart(product.id, qty, selectedSize, selectedColor, colorName);
      }
      setShowCart(true);
    } catch (e) {
      console.error("Error adding to cart:", e);
    }
  };

  // Quantity handlers (only after added to cart)
  const handleIncrease = () => {
    if (cartItemId) dispatch(increaseQuantity(cartItemId));
  };
  const handleDecrease = () => {
    if (cartItemId && qty > 1) dispatch(decreaseQuantity(cartItemId));
  };

  return (
    <div className="max-w-7xl mx-auto py-10 mt-14 font-sans px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start rounded-md">
        <div className="bg-white rounded-md border border-gray-200 shadow-sm">
          <div className="relative">
            {productBadge && (
              <div className="absolute  bg-blue-100 text-blue-700 text-md px-2 py-1 rounded-tl-md rounded-br-md">
                {productBadge}
              </div>
            )}
            <div className="flex items-center justify-center p-4 bg-[#f8fafc] rounded-lg min-h-[400px] sm:min-h-[600px]">
              <img
                src={productImage}
                alt={productTitle}
                className="object-contain w-full h-full max-w-full max-h-full"
              />
            </div>

            {/* Photo Grid */}
            {allImages.length > 1 && (
              <div className="px-4 py-4 ">
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, idx) => {
                    const imgSrc = img.image.startsWith("http")
                      ? img.image
                      : `${BASE_URL}${img.image}`;
                    const isSelected = selectedImageUrl === imgSrc;

                    return (
                      <button
                        key={`${img.id}-${idx}`}
                        onClick={() => setSelectedImageUrl(imgSrc)}
                        className={`aspect-square rounded-lg border-2 p-1 bg-white flex items-center justify-center transition-all hover:border-gray-400 ${
                          isSelected
                            ? "border-blue-500 shadow-md"
                            : "border-gray-200"
                        }`}
                        title={img.isLogo ? "Main Logo" : `Image ${idx}`}
                      >
                        <img
                          src={imgSrc}
                          alt={`Product ${idx}`}
                          className="object-contain max-w-full max-h-full"
                          onError={(e) => {
                            const fallback = `${base}dummyproduct.png`;
                            if (e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-2">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {productTitle}
              </h1>
              {hasRealStats && (
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xl font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                  </span>
                  <div className="flex items-center text-[#fbbc05] ml-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={18}
                        className={
                          i < Math.round(averageRating)
                            ? "text-[#fbbc05]"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">
                    {totalReviews} review{totalReviews === 1 ? "" : "s"}
                  </span>
                </div>
              )}
            </div>
            <button className="text-gray-500 p-2 rounded-full border border-gray-200 hover:bg-gray-50">
              <FaShareAlt />
            </button>
          </div>

          {/* Only show size and color for Merchandise */}
          {product?.category === "Merchandise" && (
            <div>
              <SizeandColor
                availableSizes={product?.available_sizes || []}
                availableColors={product?.available_colors || []}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
              />
            </div>
          )}

          {/* <div className="mt-6 flex items-center gap-4">
            <span className="text-md font-bold">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 text-xl font-bold flex items-center justify-center border rounded"
                disabled={!cartItemId}
              >
                -
              </button>
              <div className="w-10 h-8 flex items-center justify-center border">
                {qty}
              </div>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 text-xl flex items-center justify-center border rounded"
                disabled={!cartItemId}
              >
                +
              </button>
            </div>
          </div> */}

          <div className="mt-6">
            <div className="flex items-baseline gap-4">
              <div className="text-2xl font-bold text-gray-900">
                ${parseFloat(productPrice).toFixed(2)}
              </div>
              <div className="text-sm text-gray-400 line-through">
                ${parseFloat(productOldPrice).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-3 flex items-center justify-center gap-2 rounded-lg hover:bg-gray-800 hover:shadow-xl active:scale-95 transition-all duration-300 ease-in-out"
              // disabled={!!cartItemId}
            >
              <LuShoppingCart className="w-6 h-6" /> Add to Cart
            </button>
            <div className="text-xs text-gray-500 mt-2">
              Enjoy FREE express & Free Returns on orders over $35! Kindly place
              your order early for expedited processing.
            </div>
          </div>

          <div className="mt-10">
            <span className="font-bold text-sm ">Payment Methods:</span>
          </div>
          <div className="mt-2 flex items-center gap-3 ">
            <img
              src={`${base}visa.png`}
              alt="visa"
              className="h-10 rounded-md border p-1"
            />
            <img
              src={`${base}master.png`}
              alt="mc"
              className="h-10 rounded-md border p-1"
            />
            <img
              src={`${base}amex.png`}
              alt="amex"
              className="h-10 rounded-md border p-1"
            />
          </div>
        </div>
      </div>
      {showCart && (
        <ShoppingCartModal open={showCart} onClose={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductAddingToCart;
