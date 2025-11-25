import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import WhatarePeptides from "../Pages/WhatarePeptides";
import RootPage from "../Pages/Shop/RootPage";
import RootPageProductDetails from "../Pages/Shop/RootPageProductDetails";
import ContactUs from "../Pages/ContactUs";
import About from "../Pages/About";
import Profile from "../Pages/Profile/Profile";
import FilteredProduct from "../Pages/Home/FilteredProduct";
import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUP";
import ForgetPasswordEmail from "../Pages/Authentication/ForgetPasswordEmail";
import ForgetPasswordVerification from "../Pages/Authentication/ForgetPasswordVerifyOTP";
import SetNewPassword from "../Pages/Authentication/SetNewPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/what-are-peptides",
    element: <WhatarePeptides />,
  },
  {
    path: "/shop",
    element: <RootPage />,
  },
  {
    path: "/shop/product-details/:productId",
    element: <RootPageProductDetails />,
  },
  {
    path: "/shop/filtered-products/:category",
    element: <FilteredProduct />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forget-password-email",
    element: <ForgetPasswordEmail />,
  },
  {
    path: "/otp-verification",
    element: <ForgetPasswordVerification />,
  },
  {
    path: "/set-new-password",
    element: <SetNewPassword />,
  },
]);
