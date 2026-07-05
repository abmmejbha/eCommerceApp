import { useState, useEffect, useMemo } from 'react'
import { fetchUsersApi, addUserApi, updateUserApi, deleteUserApi } from './api/userService'
import { filterUsers } from './utils/filterUtils'
import useUserForm from './hooks/useUserForm'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import DeleteModal from './components/DeleteModal'
import Toast from './components/Toast'
import UserDetails from './components/UserDetails'

export default function App() {
  const [users, setUsers] = useState([])
  const [toast, setToast] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { formData, setFunctions, validate, clearForm, populateForm } = useUserForm()

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchUsers = async () => {
    try {
      const data = await fetchUsersApi()
      setUsers(data)
    } catch (err) {
      showToast("Data loading error!", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const data = await fetchUsersApi();
        if (isMounted) setUsers(data);
      } catch (err) {
        if (isMounted) showToast("Data loading error!", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false; 
    };
  }, []); 

  const addUser = async () => {
    if (!validate()) return
    try {
      const { editUser: _editUser, errors: _errors, ...body } = formData 
      await addUserApi(body)
      clearForm()
      showToast('User added successfully!')
      fetchUsers()
    } catch (err) {
      const errorMsg = err.response?.data?.error === 'DUPLICATE_EMAIL' ? 'This email already exists!' : 'Failed to add user'
      showToast(errorMsg, 'error')
    }
  }

  const updateUser = async () => {
    if (!formData.editUser || !validate()) return
    try {
      const { editUser: _editUser, errors: _errors, ...body } = formData
      await updateUserApi(formData.editUser._id, body)
      clearForm()
      showToast('User updated successfully!')
      fetchUsers()
    } catch (err) {
      const errorMsg = err.response?.data?.error === 'DUPLICATE_EMAIL' ? 'This email already exists!' : 'Failed to update user'
      showToast(errorMsg, 'error')
    }
  }

  const deleteUser = async () => {
    try {
      await deleteUserApi(deleteId)
      setShowModal(false)
      setDeleteId(null)
      showToast('User deleted successfully!')
      fetchUsers()
    } catch (err) {
      console.error(err)
    }
  }

  // search filtering using useMemo
  const filtered = useMemo(() => filterUsers(users, search), [users, search])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Header userCount={users.length} />
        <SearchBar search={search} setSearch={setSearch} />
        
        <UserForm
          {...formData}        
          {...setFunctions}    
          addUser={addUser} updateUser={updateUser} clearForm={clearForm}
        />

        <UserList 
          filtered={filtered} 
          loading={loading} 
          handleEditClick={populateForm} 
          handleDeleteClick={(id) => { setDeleteId(id); setShowModal(true) }} 
          handleViewClick={setSelectedUser} 
        />
        <DeleteModal showModal={showModal} setShowModal={setShowModal} setDeleteId={setDeleteId} deleteUser={deleteUser} />
        <Toast toast={toast} />
        <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
      </div>
    </div>
  )
}