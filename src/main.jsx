import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.scss";
import Contact from "./pages/Contact.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import SignIn from "./pages/SignIn.jsx";
import Root from "./pages/Root.jsx";
import Profile from "./pages/Profile.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import Terms from "./pages/Terms.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Admin from "./pages/Admin.jsx";
import store from "./store";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "product/:product",
        element: <Product />,
      },
      {
        path: "signin/",
        element: <SignIn />,
      },
      {
        path: "signin/:next",
        element: <SignIn />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
