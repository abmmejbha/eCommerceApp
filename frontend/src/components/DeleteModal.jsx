export default function DeleteModal({ showModal, setShowModal, setDeleteId, deleteUser }) {
  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm mx-4">
        <h3 className="text-lg font-semibold text-white mb-2">Delete User?</h3>
        <p className="text-slate-400 text-sm mb-6">এই user কে delete করলে আর ফিরিয়ে আনা যাবে না।</p>
        <div className="flex gap-3">
          <button
            onClick={deleteUser}
            className="flex-1 bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
          >
            হ্যাঁ, Delete করো
          </button>
          <button
            onClick={() => { setShowModal(false); setDeleteId(null) }}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium py-2.5 rounded-xl transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}