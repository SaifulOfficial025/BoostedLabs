import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import WhatarePeptides from "../Pages/WhatarePeptides";
import RootPage from "../Pages/Shop/RootPage";
import RootPageProductDetails from "../Pages/Shop/RootPageProductDetails";
import ContactUs from "../Pages/ContactUs";
import About from "../Pages/About";
import Profile from "../Pages/Profile/Profile";
import FilteredProduct from "../Pages/Home/FilteredProduct";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import ForgetPasswordEmail from "../Pages/Authentication/ForgetPasswordEmail";
import RegisteringOTP from "../Pages/Authentication/ForgetPasswordVerifyOTP";
import SetNewPassword from "../Pages/Authentication/SetNewPassword";
import MerchandiseRootPage from "../Pages/MerchandiseRootPage";
import OrderHistory from "../Pages/Profile/OrderHistory";
import UsageRootPage from "../Pages/UsageGuide/RootPage";
import ReconstituteRootPage from "../Pages/Reconstitute/RootPage";
import ForgetPasswordOTP from "../Pages/Authentication/ForgetPasswordVerifyOTP";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "what-are-peptides",
        element: <WhatarePeptides />,
      },
      {
        path: "shop",
        element: <RootPage />,
      },
      {
        path: "merchandise",
        element: <MerchandiseRootPage />,
      },
      {
        path: "shop/product-details/:productId",
        element: <RootPageProductDetails />,
      },
      {
        path: "shop/filtered-products/:category",
        element: <FilteredProduct />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forget-password-email",
        element: <ForgetPasswordEmail />,
      },
      {
        path: "registering-otp-verification",
        element: <RegisteringOTP />,
      },
      {
        path: "forget-password-otp",
        element: <ForgetPasswordOTP />,
      },
      {
        path: "set-new-password",
        element: <SetNewPassword />,
      },
      { path: "usage-guide", element: <UsageRootPage /> },
      { path: "reconstitute", element: <ReconstituteRootPage /> },
    ],
  },
]);
