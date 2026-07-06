import ProductCard from "./Products/ProductCard";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Shop = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({ keyword: "" });

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message}</Message>;

  return (
    <div>
      <h1>Shop</h1>
      <div>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
