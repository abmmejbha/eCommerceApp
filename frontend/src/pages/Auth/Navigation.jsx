import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex gap-6">
        <Link to="/" className="hover:text-gray-300 font-medium">
          Home
        </Link>
        <Link to="/shop" className="hover:text-gray-300 font-medium">
          Shop
        </Link>
        <Link to="/cart" className="hover:text-gray-300 font-medium">
          Cart
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {userInfo ? (
          <>
            <Link to="/profile" className="hover:text-gray-300 font-medium">
              {userInfo.username}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300 font-medium">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
