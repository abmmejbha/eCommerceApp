import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return <p><Loading></Loading>...</p>;
  if (error) return <p>Error: {error?.data?.message || error.error}</p>;

  return (
    <div>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.user ? order.user.username : "N/A"}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>{order.isPaid ? "✅" : "❌"}</td>
              <td>{order.isDelivered ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
