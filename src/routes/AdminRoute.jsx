import React from 'react'
import {Routes,Route} from "react-router-dom"
import ProtectedRoute from "../General/ProtectedRoute";
import UpdateContext,{Updatedata} from "../context/UpdateProvider";
import ErrorProvider,{ErrorContext} from "../context/ErrorProvider"

import AdminDashboard from "../admin/AdminDashboard"
import ServiceRequests from "../admin/ServiceRequests"
import Allusers from "../admin/Allusers"
import AllEngineers from "../admin/AllEngineers"
import AssignService from "../admin/AssignService"
import AddEngineers from "../admin/AddEngineers"

function AdminRoute() {
  return (
    <>
       <Routes>
        
        <Route path="/dashboard" element={ <ProtectedRoute> <AdminDashboard/> </ProtectedRoute> }  />
        <Route path="/servicerequests" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
        <Route path="/assignuser/:id" element={<><ProtectedRoute><ErrorProvider><AssignService /></ErrorProvider></ProtectedRoute></>} />
        <Route path="/allusers" element={<ProtectedRoute><Allusers/></ProtectedRoute>} />
        <Route path="/allengineers" element={<ProtectedRoute><AllEngineers /></ProtectedRoute>} />
         <Route path="addEngineers" element={<ProtectedRoute><AddEngineers/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default AdminRoute