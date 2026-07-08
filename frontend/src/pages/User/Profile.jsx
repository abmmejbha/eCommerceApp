import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);

  const [updateProfile, { isLoading }] = useProfileMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ username, email }).unwrap();
      dispatch(setCredentials(res));
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err?.data?.error || "Profile update error !");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button disabled={isLoading}>{isLoading ? "Saving..." : "Update"}</button>
    </form>
  );
};

export default Profile;