import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://user-management-backend-r07v.onrender.com'


function getInitials(name) {
  if(!name) return '?'
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

const avatarColors = ['bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-indigo-500']

function getColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i)
  return avatarColors[hash % avatarColors.length]
}

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [editUser, setEditUser] = useState(null)

  // সব user load করো
  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`) // ব্যাকএন্ডের GET রাউটে কল দেয়
    setUsers(res.data) // সার্ভার থেকে আসা ডেটা 'users' স্টেটে সেট করে
    setLoading(false) // // data আসলে loading বন্ধ
  }

  useEffect(() => {
    fetchUsers()
  }, [])


  // নতুন user add করো
  const addUser = async () => {
    if (!name || !email) return // নাম বা ইমেইল খালি থাকলে থামিয়ে দেয়

    try {
      await axios.post(`${API}/users`, { name, email }) // ব্যাকএন্ডের POST রাউটে ডেটা পাঠায়
      setName('');
      setEmail('') // ইনপুট বক্স খালি করে দেয়
      fetchUsers() // নতুন ইউজারসহ লিস্টটি আবার আপডেট করে
    } catch (err) {
      console.error("Add user failed: ", err)
    }
  }

  //update user function 
  const updateUser = async () => {
    if (!editUser || !name || !email) return
    setLoading(true)

    try {
      await axios.put(`${API}/users/${editUser._id}`, { name, email })
      // কাজ শেষ, এবার সব রিসেট
      setEditUser(null)
      setName('')
      setEmail('')

      await fetchUsers();// লিস্ট আপডেট 

    } catch (err) {
      console.error("Update failed:", err)
      alert("Could not update user!")

    } finally {
      setLoading(false)
    }
  }
    // user delete করো
    const deleteUser = async (id) => {
      await axios.delete(`${API}/users/${id}`) // নির্দিষ্ট ID সহ DELETE রিকোয়েস্ট পাঠায়
      fetchUsers() // ডিলিট হওয়ার পর ফ্রন্টএন্ডে লিস্ট আপডেট করে
    }


    // search দিয়ে filtering
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    )

    const handleEditClick = (user) => {
      setEditUser(user); // ইউজারের অবজেক্ট (id, name, email) সেভ হলো
      setName(user.name);    // ইনপুট বক্সে নাম চলে আসবে
      setEmail(user.email);  // ইনপুট বক্সে ইমেইল চলে আসবে
    };

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.5M9 20H4v-2a4 4 0 015-3.5m0 0a4 4 0 118 0m-8 0V14m8 3.5V14m0 0a4 4 0 10-8 0" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">User Management</h1>
            </div>
            <p className="text-slate-400 text-sm ml-11">{users.length} total users</p>
          </div>

          <div className="relative mb-6">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search users by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
            />
          </div>

          {/* Add User Form */}

          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-6">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-4">
              {editUser ? '✏️ Edit User' : '+ Add New User'}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
              />
              <input
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
              />
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

          {/* User List */}

          <div className="space-y-2">
            {loading ? (
              <div className="text-center py-16">
                <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading users...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl">
                <p className="text-slate-500 text-sm">No users found.</p>
              </div>
            ) : (
              filtered.map((user) => (
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
                      onClick={() => deleteUser(user._id)}
                      className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }

export default App
