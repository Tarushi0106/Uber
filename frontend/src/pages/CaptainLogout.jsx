import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const CaptainLogout = () => {
    const token = localStorage.getItem('token')
    try {
        const response = axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status === 200) {
            localStorage.removeItem('token')
            Navigate('/login')
        }
    } catch (error) {
        console.error('Error logging out captain:', error)
    }
  return (
    <div>
      CaptainLogout
    </div>
  )
}

export default CaptainLogout
