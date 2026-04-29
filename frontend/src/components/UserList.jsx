function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColors = ['bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-indigo-500']

function getColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i)
  return avatarColors[hash % avatarColors.length]
}

export default function UserList({ filtered, loading, handleEditClick, handleDeleteClick }) {
  if (loading) return (
    <div className="text-center py-16">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
      <p className="text-slate-400 text-sm">Loading users...</p>
    </div>
  )

  if (filtered.length === 0) return (
    <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
      <svg className="w-16 h-16 mx-auto mb-4 text-slate-700" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
      <p className="text-slate-400 text-sm font-medium">কোনো user নেই</p>
      <p className="text-slate-600 text-xs mt-1">উপরে নাম আর ইমেইল দিয়ে নতুন user যোগ করো</p>
    </div>
  )

  return (
    <div className="space-y-2">
      {filtered.map((user) => (
        <div
          key={user._id}
          className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3.5 hover:border-slate-600 transition group"
        >
          <div className={`w-10 h-10 rounded-full ${getColor(user.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {getInitials(user.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-100 truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={() => handleEditClick(user)}
              className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-violet-400 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-3 1 1-3a4 4 0 01.828-1.414z" />
              </svg>
            </button>
            <button
              onClick={() => handleDeleteClick(user._id)}
              className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}