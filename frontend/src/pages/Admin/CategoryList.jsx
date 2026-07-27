import { useState } from "react";
import {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import CategoryForm from "../../components/CategoryForm";

const CategoryList = () => {
  const { data: categories, isLoading, error } = useFetchCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.data?.message || error.error}</p>;

  return (
    <div>
      <h1>Categories</h1>

      <CategoryForm
        value={name}
        setValue={setName}
        handleSubmit={async (e) => {
          e.preventDefault();
          if (!name) return;

          try {
            await createCategory({ name }).unwrap();
            setName("");
          } catch (err) {
            console.log(err);
          }
        }}
      />

      <ul>
        {categories.map((category) => (
          <li 
          key={category._id}
          onClick={() => {
            setSelectedCategory(category)
            setUpdatingName(category.name)
          }}
          style={{cursor: "pointer"}}
          >
            {category.name}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
