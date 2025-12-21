import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth";
import chooseYourBoostedProductReducer from "./ChooseYourBoostedProduct";
import shopProductReducer from "./ShopProduct";
import merchandiseProductsReducer from "./MerchandiseProducts";
import productDetailsReducer from "./ProductDetails";
import profileReducer from "./Profile";
import contactUsReducer from "./ContactUs";
import filteredProductReducer from "./FilteredProduct";
import changePasswordReducer from "./ChangePassword";
import forgetPasswordReducer from "./ForgetPassword";
import cartReducer from "./Cart";
import orderHistoryReducer from "./OrderHistory";
import chatReducer from "./Chat";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chooseYourBoostedProduct: chooseYourBoostedProductReducer,
    shopProduct: shopProductReducer,
    merchandiseProducts: merchandiseProductsReducer,
    productDetails: productDetailsReducer,
    profile: profileReducer,
    contactUs: contactUsReducer,
    filteredProduct: filteredProductReducer,
    changePassword: changePasswordReducer,
    forgetPassword: forgetPasswordReducer,
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    chat: chatReducer,
  },
});
