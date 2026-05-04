import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import DeleteModal from './components/DeleteModal'
import Toast from './components/Toast'
import UserDetails from './components/UserDetails'

const API = 'https://user-management-backend-r07v.onrender.com'

export default function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [editUser, setEditUser] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState(null)
  const [errors, setErrors] = useState({})
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [gender, setGender] = useState('')
  const [website, setWebsite] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)


  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`)
      setUsers(res.data)
    } catch (err) {
      showToast("Data loading error!", 'error')
    } finally {
      setLoading(false)
    }
  }


  const handleViewClick = (user) => {
    setSelectedUser(user)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const validate = () => {
    const newErrors = {}
    
    // Name validation
    if (!name.trim()) newErrors.name = 'Name is required'
    else if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters'
    
    // Email validation
    if (!email) newErrors.email = 'Email is required'
    else if (!email.includes('@') || !email.includes('.')) newErrors.email = 'Valid email is required (e.g., user@domain.com)'
    
    // Age validation
    if (age) {
      const ageNum = parseInt(age)
      if (isNaN(ageNum)) newErrors.age = 'Age must be a number'
      else if (ageNum < 1) newErrors.age = 'Age must be at least 1'
      else if (ageNum > 120) newErrors.age = 'Age cannot exceed 120'
    }
    
    // Phone validation (if provided)
    if (phone && phone.trim()) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,9}$/
      if (!phoneRegex.test(phone)) newErrors.phone = 'Invalid phone format'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const clearForm = () => {
    setName(''); setEmail(''); setPhone(''); setAge('');
    setCity('');
    setCountry('');
    setGender('');
    setWebsite('');
    setEditUser(null);
    setErrors({});
  }

  const addUser = async () => {
    if (!validate()) return
    try {
      await axios.post(`${API}/users`, { name, email, phone, age, city, country, gender, website })
      clearForm()
      showToast('User added successfully!')
      fetchUsers()
    } catch (err) {
      console.error('Add user failed:', err)
      const errorMsg = err.response?.data?.message || 'Failed to add user'
      const errorDetails = err.response?.data?.errors
      
      if (err.response?.data?.error === 'DUPLICATE_EMAIL') {
        showToast('This email already exists!', 'error')
      } else if (errorDetails && Array.isArray(errorDetails)) {
        showToast(errorDetails[0], 'error')
      } else {
        showToast(errorMsg, 'error')
      }
    }
  }

  const updateUser = async () => {
    if (!editUser || !validate()) return
    try {
      await axios.put(`${API}/users/${editUser._id}`, { name, email, phone, age, city, country, gender, website })
      clearForm()
      showToast('User updated successfully!')
      fetchUsers()
    } catch (err) {
      console.error('Update failed:', err)
      const errorMsg = err.response?.data?.message || 'Failed to update user'
      const errorDetails = err.response?.data?.errors
      
      if (err.response?.data?.error === 'DUPLICATE_EMAIL') {
        showToast('This email already exists!', 'error')
      } else if (errorDetails && Array.isArray(errorDetails)) {
        showToast(errorDetails[0], 'error')
      } else {
        showToast(errorMsg, 'error')
      }
    }
  }

  const deleteUser = async () => {
    try {
      await axios.delete(`${API}/users/${deleteId}`)
      setShowModal(false)
      setDeleteId(null)
      showToast('User deleted successfully!')
      fetchUsers()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleEditClick = (user) => {
    setEditUser(user)
    setName(user.name)
    setEmail(user.email)
    setPhone(user.phone || '')
    setAge(user.age)
    setCity(user.city || '')
    setCountry(user.country)
    setGender(user.gender)
    setWebsite(user.website || '')
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setShowModal(true)
  }

  // filtering using useMemo
  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()

    if (!query) return users

    return users.filter((user) => {
      const fields = [
        user.name,
        user.email,
        user.phone,
        user.city,
        user.country,
        user.gender,
        user.website,
        user.age?.toString(),
      ]

      return fields.some((field) =>
        field?.toString().toLowerCase().includes(query)
      )
    })
  },[users, search])

  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Header userCount={users.length} />
        <SearchBar search={search} setSearch={setSearch} />
        <UserForm
          name={name} setName={setName}
          email={email} setEmail={setEmail}
          phone={phone} setPhone={setPhone}
          website={website} setWebsite={setWebsite}
          city={city} setCity={setCity}
          age={age} setAge={setAge}
          country={country} setCountry={setCountry}
          gender={gender} setGender={setGender}
          editUser={editUser} setEditUser={setEditUser}
          addUser={addUser} updateUser={updateUser}
          errors={errors}
          clearForm = {clearForm}
        />
        <UserList
          filtered={filtered}
          loading={loading}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleViewClick={handleViewClick}
        />
        <DeleteModal
          showModal={showModal}
          setShowModal={setShowModal}
          setDeleteId={setDeleteId}
          deleteUser={deleteUser}
        />
        <Toast toast={toast} />

        <UserDetails
          user={selectedUser}
          onClose={ () =>  setSelectedUser(null)}
        />

      </div>
    </div>
  )
}
