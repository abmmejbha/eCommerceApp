export default function UserForm({ name, setName, email, setEmail, editUser, setEditUser, addUser, updateUser, errors }) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-6">
      <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-4">
        {editUser ? '✏️ Edit User' : '+ Add New User'}
      </h2>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            onKeyDown={(e) => e.key === 'Enter' && (editUser ? updateUser() : addUser())}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
          {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="flex-1">
          <input
            onKeyDown={(e) => e.key === 'Enter' && (editUser ? updateUser() : addUser())}
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
          />
          {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        {editUser ? (
          <>
            <button
              onClick={updateUser}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => { setEditUser(null); setName(''); setEmail('') }}
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
  )
}