import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <div>
        Cart Empty — <Link to="/shop">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.map((item) => (
        <div key={item._id}>
          <Link to={`/product/${item._id}`}>{item.name}</Link>
          <p>Price: {item.price}৳</p>

          <select
            value={item.qty}
            onChange={(e) => addToCartHandler(item, Number(e.target.value))}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>

          <button onClick={() => removeFromCartHandler(item._id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>
        Total Price:{" "}
        {cartItems
          .reduce((acc, item) => acc + item.qty * item.price, 0)
          .toFixed(2)}
        ৳
      </h2>
    </div>
  );
};

export default Cart;
