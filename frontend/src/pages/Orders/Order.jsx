import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, isError } = useGetOrderDetailsQuery(orderId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Order not found</p>;

  return (
    <div>
      <h2>Order #{order._id}</h2>
      <p>Address: {order.shippingAddress.address}, {order.shippingAddress.city}</p>
      <p>Payment: {order.isPaid ? "Paid ✅" : "Pending ❌"}</p>
      <p>Delivery: {order.isDelivered ? "Delivered ✅" : "Not Delivered Yet ❌"}</p>

      {order.orderItems.map((item) => (
        <p key={item._id}>{item.name} × {item.qty} = {(item.qty * item.price).toFixed(2)}৳</p>
      ))}

      <h3>Total: {order.totalPrice}৳</h3>
    </div>
  );
};

export default Order;