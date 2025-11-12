import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AdminPanal from './adminPanal'
import AddHome from './addHome'
import AddGym from './addGym'
import AdminDashbord from './adminDashbord'


function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanal />}>
        {/* Default route inside AdminPanal */}
        <Route index element={<AdminDashbord />} />
        <Route path="addHomeWorkout" element={<AddHome />} />
        <Route path="addGymWorkout" element={<AddGym />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  )
}

export default AdminRouter
