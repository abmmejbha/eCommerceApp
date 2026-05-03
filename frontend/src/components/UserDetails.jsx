export default function UserDetails({ user, onClose }) {
  if (!user) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm mx-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">User Details</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Name</p>
            <p className="text-sm text-slate-100 font-medium">{user.name || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Email</p>
            <p className="text-sm text-slate-100 font-medium">{user.email || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Phone</p>
            <p className="text-sm text-slate-100 font-medium">{user.phone || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Website</p>
            <p className="text-sm text-slate-100 font-medium">{user.website || '—'}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">City</p>
            <p className="text-sm text-slate-100 font-medium">{user.city || '—'}</p>
          </div>
        </div>

      </div>
    </div>
  )
}