export default function Header({ userCount }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.5M9 20H4v-2a4 4 0 015-3.5m0 0a4 4 0 118 0m-8 0V14m8 3.5V14m0 0a4 4 0 10-8 0" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">User Management</h1>
      </div>
      <p className="text-slate-400 text-sm ml-11">{userCount} total users</p>
    </div>
  )
}