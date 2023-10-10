import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.scss";
import About from "./pages/About.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/contact",
    element: <h1>Contact</h1>,
  },
  {
    path: "/product/:product",
    element: <Product />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
