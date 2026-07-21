import { useState } from "react";
import axios from "axios";
import { useCreateProductMutation } from "../../redux/api/productApiSlice";
import { BASE_URL } from "../../utils/constants";

const ProductList = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [createProduct] = useCreateProductMutation();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageUrl(res.data.image);
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      image: imageUrl,
      name,
      price: Number(price),
      brand,
      quantity: Number(quantity),
      description,
      category,
    };

    try {
      await createProduct(productData).unwrap();
      alert("Product created successfully");

      setName("");
      setPrice("");
      setBrand("");
      setQuantity("");
      setDescription("");
      setCategory("");
      setImageUrl("");
    } catch {
      alert("Failed to create product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "300px",
      }}
    >
      <input type="file" onChange={uploadFileHandler} />
      {imageUrl && <img src={imageUrl} alt="preview" width="100" />}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        type="number"
        required
      />
      <input
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand"
      />
      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        type="number"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />

      <button type="submit">Create Product</button>
    </form>
  );
};

export default ProductList;
