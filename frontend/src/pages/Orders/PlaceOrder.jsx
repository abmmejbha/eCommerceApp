import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCartItems } from "../../redux/features/cart/cartSlice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      alert(err?.data?.error || "Order creation error!");
    }
  };

  return (
    <div>
      <h2>
        Shipping Address: {cart.shippingAddress.address},{" "}
        {cart.shippingAddress.city}
      </h2>
      {cart.cartItems.map((item) => (
        <p key={item._id}>
          {item.name} × {item.qty} = {(item.qty * item.price).toFixed(2)}৳
        </p>
      ))}
      <h3>Total: {cart.totalPrice}৳</h3>
      <button disabled={isLoading} onClick={placeOrderHandler}>
        Confirm Order
      </button>
      <button onClick={() => navigate("/shipping")}>
        Change Shipping Address
      </button>
    </div>
  );
};

export default PlaceOrder;
