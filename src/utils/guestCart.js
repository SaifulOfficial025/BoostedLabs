/**
 * Guest Cart Management Utilities
 * Handles local storage cart operations for non-logged-in users
 */

const GUEST_CART_KEY = "guestCart";

// Get guest cart from localStorage
export const getGuestCart = () => {
  try {
    const cart = localStorage.getItem(GUEST_CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error reading guest cart:", error);
    return [];
  }
};

// Save guest cart to localStorage
export const saveGuestCart = (cart) => {
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving guest cart:", error);
  }
};

// Add item to guest cart
export const addToGuestCart = (productId, quantity = 1, size = null, colorHex = null, colorName = null) => {
  const cart = getGuestCart();
  
  // Check if product already exists in cart
  const existingItemIndex = cart.findIndex(
    (item) => 
      item.product_id === productId && 
      item.size === size && 
      item.color_hex === colorHex
  );

  if (existingItemIndex !== -1) {
    // Update quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.push({
      id: Date.now(), // Temporary ID
      product_id: productId,
      quantity,
      size,
      color_hex: colorHex,
      color_name: colorName,
    });
  }

  saveGuestCart(cart);
  return cart;
};

// Remove item from guest cart
export const removeFromGuestCart = (itemId) => {
  const cart = getGuestCart();
  const updatedCart = cart.filter((item) => item.id !== itemId);
  saveGuestCart(updatedCart);
  return updatedCart;
};

// Update item quantity in guest cart
export const updateGuestCartQuantity = (itemId, quantity) => {
  const cart = getGuestCart();
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  
  if (itemIndex !== -1) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      return removeFromGuestCart(itemId);
    }
    cart[itemIndex].quantity = quantity;
    saveGuestCart(cart);
  }
  
  return cart;
};

// Increase item quantity
export const increaseGuestCartQuantity = (itemId) => {
  const cart = getGuestCart();
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += 1;
    saveGuestCart(cart);
  }
  
  return cart;
};

// Decrease item quantity
export const decreaseGuestCartQuantity = (itemId) => {
  const cart = getGuestCart();
  const itemIndex = cart.findIndex((item) => item.id === itemId);
  
  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      // Remove item if quantity becomes 0
      return removeFromGuestCart(itemId);
    }
    saveGuestCart(cart);
  }
  
  return cart;
};

// Clear guest cart
export const clearGuestCart = () => {
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error("Error clearing guest cart:", error);
  }
};

// Get guest cart count
export const getGuestCartCount = () => {
  const cart = getGuestCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

// Get guest cart total
export const getGuestCartTotal = (products) => {
  const cart = getGuestCart();
  return cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.product_id);
    if (product) {
      const price = parseFloat(product.discounted_price || product.initial_price);
      return sum + (price * item.quantity);
    }
    return sum;
  }, 0);
};
