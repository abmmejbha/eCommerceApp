import ProductCard from "./Products/ProductCard";
import { products } from "../data/products";

const Shop = () => {
  return (
    <div>
      <h1>Shop</h1>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;