import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:3000'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // সব user load করো
  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`)
    setUsers(res.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // নতুন user add করো
  const addUser = async () => {
    if (!name || !email) return
    await axios.post(`${API}/users`, { name, email })
    setName('')
    setEmail('')
    fetchUsers()
  }

  // user delete করো
  const deleteUser = async (id) => {
    await axios.delete(`${API}/users/${id}`)
    fetchUsers()
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>User Management</h1>

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
        <button onClick={addUser}>Add User</button>
      </div>

      {/* User List */}
      {users.map((user) => (
        <div key={user._id} style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px',
          borderBottom: '1px solid #ccc'
        }}>
          <span>{user.name} — {user.email}</span>
          <button onClick={() => deleteUser(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default App