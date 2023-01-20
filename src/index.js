import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import ProtectedRoute from "./pages/ProtectedRoute";
import NewProduct from "./pages/NewProduct";
import ProductsList from "./pages/ProductsList";
import PaymentResult from "./pages/PaymentResult";
import OrdersList from "./pages/OrdersList";
import OrderDetail from "./pages/OrderDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, path: "/", element: <Home /> },
      { path: "/products", element: <ProductsList /> },
      { path: "/product/:id", element: <ProductDetail /> },
      {
        path: "/product/new",
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/success",
        element: (
          <ProtectedRoute>
            <PaymentResult />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <OrdersList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
