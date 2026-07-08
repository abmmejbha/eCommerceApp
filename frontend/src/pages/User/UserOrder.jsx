import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

const UserOrder = () => {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <Link to={`/order/${order._id}`}>Order #{order._id}</Link>
          <span>{order.isPaid ? "Paid" : "Unpaid"}</span>
        </div>
      ))}
    </div>
  );
};

export default UserOrder;