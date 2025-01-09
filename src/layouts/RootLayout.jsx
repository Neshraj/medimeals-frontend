import React from 'react'
import Login from '../components/Login'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <Outlet />
  )
}

export default RootLayout