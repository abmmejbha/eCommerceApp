import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";

const CategoryList = () => {
  const { data: categories, isLoading, error } = useFetchCategoriesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.data?.message || error.error}</p>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
