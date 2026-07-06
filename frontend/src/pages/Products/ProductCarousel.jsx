import { useState } from "react";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [index, setIndex] = useState(0);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>সমস্যা হয়েছে</p>;

  const currentProduct = products[index];

  const handleNext = () => setIndex((prev) => (prev + 1) % products.length);
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <div>
      <h2>{currentProduct.name}</h2>
      <p>{currentProduct.price}৳</p>
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ProductCarousel;
