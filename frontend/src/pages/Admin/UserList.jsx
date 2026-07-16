import { useGetUsersQuery } from "../../redux/api/usersApiSlice";

const UserList = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <p>Error: {error?.data?.message || error.error}</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin?</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
