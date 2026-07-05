// src/api/userService.js
import axios from 'axios'

const API = 'https://user-management-backend-r07v.onrender.com'

export const fetchUsersApi = async () => {
  const res = await axios.get(`${API}/users`)
  return res.data
}

export const addUserApi = async (userData) => {
  const res = await axios.post(`${API}/users`, userData)
  return res.data
}

export const updateUserApi = async (id, userData) => {
  const res = await axios.put(`${API}/users/${id}`, userData)
  return res.data
}

export const deleteUserApi = async (id) => {
  const res = await axios.delete(`${API}/users/${id}`)
  return res.data
}