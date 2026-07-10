import { Link } from "react-router-dom";

const AdminMenu = () => (
  <div>
    <Link to="/admin/dashboard">Dashboard</Link>
    <Link to="/admin/productlist">Products</Link>
    <Link to="/admin/categorylist">Categories</Link>
    <Link to="/admin/orderlist">Orders</Link>
    <Link to="/admin/userlist">Users</Link>
  </div>
);

export default AdminMenu;
