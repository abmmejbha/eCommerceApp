import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productApiSlice";

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Product পাওয়া যায়নি</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}৳</p>
    </div>
  );
};

export default Product;
