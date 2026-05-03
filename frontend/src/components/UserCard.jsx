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

export default function UserCard({ user, handleEditClick, handleDeleteClick, handleViewClick }) {
  return (
    <div
      onClick={() => handleViewClick(user)}
      className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3.5 hover:border-slate-600 transition group cursor-pointer"
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
          onClick={(e) => { e.stopPropagation(); handleEditClick(user) }}
          className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-violet-400 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-3 1 1-3a4 4 0 01.828-1.414z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleDeleteClick(user._id) }}
          className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          </svg>
        </button>
      </div>
    </div>
  )
}