// frontend/src/pages/Shop.jsx (মূল অংশ)
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop,
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      dispatch(setProducts(filteredProductsQuery.data));
    }
  }, [filteredProductsQuery.data, dispatch]);

  const handleCheck = (checkedValue, categoryId) => {
    const updatedChecked = checkedValue
      ? [...checked, categoryId]
      : checked.filter((c) => c !== categoryId);
    dispatch(setChecked(updatedChecked));
  };

  return (
    <div>
      <aside>
        {categories?.map((c) => (
          <label key={c._id}>
            <input
              type="checkbox"
              onChange={(e) => handleCheck(e.target.checked, c._id)}
            />
            {c.name}
          </label>
        ))}
      </aside>

      <div>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
