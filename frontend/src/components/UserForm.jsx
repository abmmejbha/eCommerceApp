export default function UserForm({
  name, setName,
  email, setEmail,
  phone, setPhone,
  website, setWebsite,
  city, setCity,
  editUser, setEditUser,
  addUser, updateUser,
  errors,
}) {
  
  // রিসেট ফাংশন (বারবার না লিখে এক জায়গায় করা ভালো)
  const handleCancel = () => {
    setEditUser(null);
    setName("");
    setEmail("");
    setPhone("");
    setWebsite("");
    setCity("");
  };

  const onEnterKey = (e) => {
    if (e.key === "Enter") {
      editUser ? updateUser() : addUser();
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-6">
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-4">
        {editUser ? "✏️ Edit User" : "+ Add New User"}
      </h2>

      {/* ইনপুট ফিল্ডগুলোর গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="flex-1">
          <input
            onKeyDown={onEnterKey}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
          {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="flex-1">
          <input
            onKeyDown={onEnterKey}
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
          {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="flex-1">
          <input
            onKeyDown={onEnterKey}
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
          {errors.phone && <p className="text-rose-400 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div className="flex-1">
          <input
            onKeyDown={onEnterKey}
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
        </div>

        <div className="flex-1">
          <input
            onKeyDown={onEnterKey}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
        </div>
      </div>

      {/* বাটন সেকশন */}
      <div className="flex gap-2 mt-4">
        {editUser ? (
          <>
            <button
              onClick={updateUser}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium py-2.5 rounded-xl transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addUser}
            className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-40"
            disabled={!name || !email}
          >
            Add User
          </button>
        )}
      </div>
    </div>
  );
}