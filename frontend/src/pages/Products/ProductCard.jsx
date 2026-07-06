import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div>
        <h3>{product.name}</h3>
        <p>Price: {product.price}৳</p>
      </div>
    </Link>
  );
};

export default ProductCard;
