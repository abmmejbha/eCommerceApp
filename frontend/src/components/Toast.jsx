export default function Toast({ toast }) {
  if (!toast) return null

  return (
    <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all
      ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
      {toast.message}
    </div>
  )
}