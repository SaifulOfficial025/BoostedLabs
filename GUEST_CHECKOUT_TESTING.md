# Guest Checkout Testing Guide

## Quick Start

### Testing Guest Checkout Flow

1. **Open the website without logging in**

   - Make sure you're logged out (clear localStorage if needed)
   - Navigate to the shop page

2. **Browse and add products to cart**

   ```
   - Click on any product
   - Select size/color if it's merchandise
   - Click "Add to Cart"
   - Cart icon should show the item count
   ```

3. **View cart**

   ```
   - Click the shopping cart icon in header
   - Cart modal should open showing your items
   - Try increasing/decreasing quantities
   - Try removing items
   - All changes saved to localStorage
   ```

4. **Proceed to checkout**

   ```
   - Click "Proceed to checkout" button
   - Guest checkout modal should appear (not the regular one)
   - Notice the EMAIL field (required for guests)
   ```

5. **Complete checkout**

   ```
   - Fill in:
     * Email (required)
     * Full Name
     * Phone Number
     * Address
     * Address Type (Home/Office)
   - Click "Go for Payment"
   - Stripe checkout should open in new tab
   - Complete payment
   ```

6. **Verify cart cleared**
   ```
   - Return to site
   - Cart icon should show 0 items
   - localStorage guestCart should be empty
   ```

## Testing as Logged-in User

1. **Login to your account**

   - Use existing credentials
   - Should redirect to home/dashboard

2. **Add products to cart**

   - Items should be saved to backend (not localStorage)
   - Cart count should display from Redux state

3. **Checkout**
   - Should use AddShippingAddressModal (no email field)
   - Should use existing backend cart flow

## Debugging

### Check localStorage

```javascript
// In browser console:
localStorage.getItem("guestCart");
// Should return JSON array of cart items for guests
// Should be null for logged-in users

localStorage.getItem("auth");
// Should be null for guests
// Should contain auth token for logged-in users
```

### Check Redux state

```javascript
// In React DevTools:
state.cart.items; // Logged-in user cart (from backend)
state.guestCheckout; // Guest checkout state
state.shopProduct.products; // Product catalog (needed for guest cart display)
```

### Common Issues

**Issue**: Guest cart items not showing in cart modal

- **Solution**: Make sure shop products are loaded (`state.shopProduct.products`)
- The cart needs product details to display items

**Issue**: Cart count not updating after add/remove

- **Solution**: Close and reopen cart modal to trigger re-render
- Header refreshes cart count on modal close

**Issue**: "Your cart is empty" but cart count shows items

- **Solution**: Products not loaded yet - navigate to shop page first

**Issue**: Checkout fails with validation error

- **Solution**: Check that all required fields are filled
- Merchandise items need size/color if available

**Issue**: Stripe checkout doesn't open

- **Solution**: Check browser popup blocker
- API might be returning error (check console/network tab)

## Browser Developer Tools

### Network Tab

Look for these API calls:

**Guest Checkout**:

```
POST /shop/checkout/
Request:
{
  "cart_items": [{"product_id": 1, "quantity": 2}],
  "address": {...},
  "email": "guest@example.com",
  "is_subscription": false
}
Response:
{
  "order": {...},
  "checkout_url": "https://checkout.stripe.com/..."
}
```

**User Checkout** (for comparison):

```
POST /shop/checkout/
Request:
{
  "address": {...},
  "is_subscription": false
}
Response:
{
  "order": {...},
  "checkout_url": "https://checkout.stripe.com/..."
}
```

### Console Logs

Should see:

- "Order created successfully!" (toast on success)
- "Checkout failed" (toast on error)
- Any cart operation errors

## Feature Checklist

### Guest Features

- [x] Add to cart without login
- [x] View cart items
- [x] Update quantities
- [x] Remove items
- [x] Persistent cart (survives refresh)
- [x] Checkout with email
- [x] Stripe payment
- [x] Cart cleared after checkout

### User Features (Preserved)

- [x] Add to cart with login
- [x] Backend cart sync
- [x] View cart items
- [x] Update quantities
- [x] Remove items
- [x] Checkout without email
- [x] Free t-shirt eligibility
- [x] Recurring orders

### Edge Cases

- [ ] Guest logs in (cart NOT migrated)
- [ ] User logs out (sees empty guest cart)
- [ ] Multiple browsers (no sync - expected)
- [ ] localStorage cleared (cart lost - expected)
- [ ] Very large cart (>50 items)

## Performance Notes

- Guest cart operations are instant (no API calls)
- No network latency for add/remove/update
- Checkout requires API call (same as user)
- Product data must be in Redux state

## Security Notes

- Guest cart is client-side only
- No authentication required
- Email is only collected at checkout
- Cart data is not encrypted in localStorage
- Checkout validates on backend (product IDs, quantities)

## Next Steps After Testing

If everything works:

1. Test on staging environment
2. Test with real Stripe test keys
3. Check order appears in admin panel with `user: null`
4. Verify email receipt sent to guest
5. Test edge cases (large orders, special characters in address, etc.)
6. Performance test with many cart items
7. Mobile responsive testing
8. Cross-browser testing (Chrome, Firefox, Safari, Edge)

## Rollback Plan

If issues found:

1. Revert changes to:
   - `src/Shared/ShoppingCartModal.jsx`
   - `src/Shared/Header.jsx`
   - `src/Pages/Shop/ProductAddingToCart.jsx`
   - `src/Redux/store.jsx`
2. Remove new files:
   - `src/utils/guestCart.js`
   - `src/Redux/GuestCheckout.jsx`
   - `src/Shared/GuestAddressModal.jsx`
3. Logged-in users will be unaffected
