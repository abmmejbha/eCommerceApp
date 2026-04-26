import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://user-management-backend-r07v.onrender.com'

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
    await axios.post(`${API}/users`, { name, email }) // ব্যাকএন্ডের POST রাউটে ডেটা পাঠায়
    setName(''); setEmail('') // ইনপুট বক্স খালি করে দেয়
    fetchUsers() // নতুন ইউজারসহ লিস্টটি আবার আপডেট করে
  }

  const updateUser = async (id) => {
    if (!editUser) return
    await axios.put(`${API}/users/${editUser._id}`, { name, email })

    // কাজ শেষ, এবার সব রিসেট করো
    setEditUser(null)
    setName('')
    setEmail('')

    fetchUsers()// লিস্ট আপডেট করো
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
          <svg className="absolute left-3 top=1/2 -translate-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 211=4.35-4.35" />
          </svg>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition"
        />
        </div>

        {/* Add User Form */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginRight: '8px', padding: '6px' }}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginRight: '8px', padding: '6px' }}
          />

          {editUser ? (
            <>
              <button onClick={updateUser} style={{ backgroundColor: 'green', color: 'white', marginRight: '5px' }}>
                Update User
              </button>
              <button onClick={() => { setEditUser(null); setName(''); setEmail(''); }}>
                Cancel
              </button>
            </>
          ) : (
            <button onClick={addUser}>Add User</button>
          )}

        </div>

        {/* User List */}
        {loading ? <p>Loading users...</p> : (
          filtered.map((user) => (
            <div key={user._id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
              borderBottom: '1px solid #ccc'
            }}>
              <span>{user.name} — {user.email}</span>
              <button onClick={() => handleEditClick(user)}>✏️</button>
              <button onClick={() => deleteUser(user._id)}>❌</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
