# Guest Checkout Implementation

## Overview

Added guest checkout functionality to allow users to purchase products without creating an account. Guest cart data is stored in localStorage and the checkout process uses a separate API flow.

## Features Implemented

### 1. **Local Storage Cart Management** (`src/utils/guestCart.js`)

Utility functions to manage guest cart in localStorage:

- `getGuestCart()` - Retrieve guest cart items
- `addToGuestCart(productId, quantity, size, colorHex, colorName)` - Add items to cart
- `removeFromGuestCart(itemId)` - Remove items from cart
- `updateGuestCartQuantity(itemId, quantity)` - Update item quantity
- `increaseGuestCartQuantity(itemId)` - Increment quantity
- `decreaseGuestCartQuantity(itemId)` - Decrement quantity
- `clearGuestCart()` - Clear all cart items
- `getGuestCartCount()` - Get total item count
- `getGuestCartTotal(products)` - Calculate cart total

**Storage Key**: `guestCart`

### 2. **Guest Checkout Redux Slice** (`src/Redux/GuestCheckout.jsx`)

Redux state management for guest checkout:

- **Actions**:
  - `guestCheckout` - Async thunk to process guest checkout
  - `clearGuestCheckoutData` - Clear checkout state
- **API Endpoint**: `POST /shop/checkout/`
- **Payload Format**:
  ```javascript
  {
    cart_items: [
      { product_id: number, quantity: number }
    ],
    address: {
      name: string,
      phone: string,
      address: string,
      type: "home" | "office"
    },
    email: string,
    is_subscription: boolean,
    free_tshirt_size?: string
  }
  ```
- **Response**: Contains `checkout_url` for Stripe payment

### 3. **Guest Address Modal** (`src/Shared/GuestAddressModal.jsx`)

Checkout form for guest users:

- Collects email (required for guest checkout)
- Collects shipping address (name, phone, address, type)
- Validates all required fields
- Opens Stripe checkout in new window
- Clears guest cart after successful checkout

### 4. **Updated Shopping Cart Modal** (`src/Shared/ShoppingCartModal.jsx`)

Enhanced to support both logged-in and guest users:

- Detects login status via `localStorage.getItem("auth")`
- For logged-in users:
  - Uses Redux cart state
  - Calls backend cart API
  - Shows AddShippingAddressModal
- For guest users:
  - Uses localStorage cart
  - Manages cart locally
  - Shows GuestAddressModal
  - Fetches product details from shopProduct state

**Key Features**:

- Separate cart item rendering logic for guests/users
- Guest cart doesn't have eligibleForFreeTshirt feature
- Fixed shipping fee ($10) for guest orders
- Cart operations (increase/decrease/remove) work offline for guests

### 5. **Updated Header** (`src/Shared/Header.jsx`)

Cart badge shows correct count for both user types:

- Logged-in users: Count from Redux cart state
- Guest users: Count from localStorage via `getGuestCartCount()`
- Auto-refreshes when cart modal closes

### 6. **Updated Product Page** (`src/Pages/Shop/ProductAddingToCart.jsx`)

Add to cart works for both logged-in and guest users:

- Logged-in: Dispatches `addToCart` Redux action
- Guest: Calls `addToGuestCart` localStorage function
- Validates size/color selection for merchandise
- Opens cart modal after successful add

### 7. **Redux Store Configuration** (`src/Redux/store.jsx`)

Added `guestCheckout` reducer to store

## User Flow

### Guest User Journey:

1. Browse products without login
2. Click "Add to Cart" → Item saved to localStorage
3. Click cart icon → View cart with guest items
4. Click "Proceed to checkout"
5. Fill out GuestAddressModal (email + address)
6. Submit → API creates order with guest details
7. Redirect to Stripe checkout
8. After payment → Guest cart is cleared

### Logged-in User Journey:

- Unchanged - uses existing cart/checkout flow
- Cart is stored on backend
- No email required (already have account)

## Technical Details

### API Differences:

- **User Checkout**: `{address: {...}, is_subscription: bool, free_tshirt_size?: string}`
- **Guest Checkout**: `{cart_items: [...], address: {...}, email: string, is_subscription: bool, free_tshirt_size?: string}`

### State Management:

- Logged-in users: Redux (`state.cart`)
- Guest users: localStorage (`guestCart` key) + local React state

### Data Persistence:

- Guest cart persists across browser sessions (localStorage)
- Cart is cleared after successful checkout
- Cart is NOT synced to backend for guests

### Product Data:

- Guest cart stores only `product_id` and metadata
- Full product details fetched from `state.shopProduct.products`
- Requires shop products to be loaded for cart to display properly

## Migration & Compatibility

### Existing Users:

- No changes to existing logged-in user flow
- All existing cart functionality preserved
- Guest checkout is an additional feature

### Guest to User Conversion:

- Guest cart is NOT automatically migrated on login
- Guest cart remains in localStorage even after login
- User sees their backend cart, not guest cart

## Future Enhancements

Potential improvements:

1. Migrate guest cart to user cart on registration/login
2. Add guest order tracking via order ID + email
3. Implement cart persistence across devices for guests
4. Add guest cart expiration (e.g., 7 days)
5. Email receipts to guest users after purchase
6. Add "Continue as Guest" button on product pages

## Files Modified

### Created:

- `src/utils/guestCart.js`
- `src/Redux/GuestCheckout.jsx`
- `src/Shared/GuestAddressModal.jsx`

### Modified:

- `src/Shared/ShoppingCartModal.jsx`
- `src/Shared/Header.jsx`
- `src/Pages/Shop/ProductAddingToCart.jsx`
- `src/Redux/store.jsx`

## Testing Checklist

- [ ] Guest can add products to cart
- [ ] Guest cart count displays correctly in header
- [ ] Guest can view cart items with correct prices
- [ ] Guest can increase/decrease quantities
- [ ] Guest can remove items
- [ ] Guest can proceed to checkout
- [ ] Email validation works in guest checkout
- [ ] Address validation works
- [ ] Stripe checkout opens correctly
- [ ] Guest cart clears after successful checkout
- [ ] Logged-in users still use old cart flow
- [ ] Cart persists after browser refresh (for guests)
- [ ] Size/color selection works for merchandise (guests)

## Notes

- Guest cart operations are synchronous (no API calls)
- Guest cart has no server-side backup
- If localStorage is cleared, guest cart is lost
- Guest orders appear in admin with `user: null`
- No recurring order option currently working for guests (subscription toggle present but may need backend support)
