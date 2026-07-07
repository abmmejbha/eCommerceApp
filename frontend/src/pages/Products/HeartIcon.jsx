import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../../redux/features/favorites/favoriteSlice";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((p) => p._id === product._id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <span onClick={toggleFavorite} style={{ cursor: "pointer" }}>
      {isFavorite ? "❤️" : "🤍"}
    </span>
  );
};

export default HeartIcon;