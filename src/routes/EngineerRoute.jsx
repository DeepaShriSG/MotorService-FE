import React from 'react'
import {Routes,Route} from "react-router-dom"
import EngineerDashboard from "../engineer/EngineerDashboard"
import AssignedUsers from "../engineer/AssignedUsers"
import CompletedUsers from "../engineer/CompletedUsers"

function EngineerRoute() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<EngineerDashboard/>}/>
        <Route path="/assignedusers" element={<AssignedUsers/>}/>
        <Route path="/completedservices" element={<CompletedUsers/>}/>
      </Routes>
    </>
  )
}

export default EngineerRoute