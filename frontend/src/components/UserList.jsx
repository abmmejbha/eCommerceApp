import UserCard from './UserCard'

export default function UserList({ filtered, loading, handleEditClick, handleDeleteClick, handleViewClick }) {
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
        <UserCard
          key={user._id}
          user={user}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleViewClick={handleViewClick}
        />
      ))}
    </div>
  )
}