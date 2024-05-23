import React from "react";
import {Routes, Route } from "react-router-dom";
import ProtectedRoute from "../General/ProtectedRoute";
import UserDashboard from "../user/UserDashboard"
import BookService from "../user/BookService"
import Menu from "../user/Menu"


function UserRoute() {
  return (
   
    <Routes>
       <Route path ="/dashboard" element={
        <>
          <ProtectedRoute>
          <Menu/> 
          <UserDashboard/>
          </ProtectedRoute>
        </>
      }/> 
      <Route path ="/bookservice" element={
        <>
          <ProtectedRoute>
          <Menu/> 
          <BookService/>
          </ProtectedRoute>
        </>
      }/> 
    </Routes>
    
  )
}

export default UserRoute