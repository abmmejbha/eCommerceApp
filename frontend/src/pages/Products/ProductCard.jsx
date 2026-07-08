import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between">
      <div>
        <div className="w-full h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
          {product.image ? (
            <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
          ) : (
            <span className="text-gray-400 text-sm">No Image</span>
          )}
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h2>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">
          {product.price}৳
        </span>
        <Link 
          to={`/product/${product._id}`} 
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded transition font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;