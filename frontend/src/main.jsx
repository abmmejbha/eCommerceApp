// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Products/Product";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/User/Profile";
import Shipping from "./pages/Orders/Shipping";
import PlaceOrder from "./pages/Orders/PlaceOrder";
import AdminRoute from "./pages/Admin/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CategoryList from "./pages/Admin/CategoryList";
import OrderList from "./pages/Admin/OrderList";
import UserList from "./pages/Admin/UserList";
import ProductList from "./pages/Admin/ProductList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="placeorder" element={<PlaceOrder />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="userlist" element={<UserList />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
