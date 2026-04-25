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
    if(!editUser) return
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
      <h1>User Management</h1>

      <input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '1rem', width: '100%', padding: '8px' }}
      />

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
