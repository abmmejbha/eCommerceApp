import ProductCard from "./Products/ProductCard";
import { products } from "../data/products";
const Home = () => {
  return (
    <div>
      <h1>Latest Products</h1>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
