import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AdminPanal from '../pages/layout/layout'
import AddHome from '../pages/addhome/addhome'
import AdminDashboard from '../pages/dashboard/dashboard'
import AddGym from '../pages/addgym/addgym'


function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanal />}>
        {/* Default route inside AdminPanal */}
        <Route index element={<AdminDashboard />} />
        <Route path="addHomeWorkout" element={<AddHome />} />
        <Route path="addGymWorkout" element={<AddGym />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  )
}

export default AdminRouter
