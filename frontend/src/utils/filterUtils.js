export const filterUsers = (users, search) => {
  const query = search.toLowerCase().trim();
  if (!query) return users;

  return users.filter((user) => {
    const fields = [
      user.name,
      user.email,
      user.phone,
      user.city,
      user.country,
      user.gender,
      user.website,
      user.age?.toString(),
    ];
    return fields.some((field) =>
      field?.toString().toLowerCase().includes(query),
    );
  });
};
