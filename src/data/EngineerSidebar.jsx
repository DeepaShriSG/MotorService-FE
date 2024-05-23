import React,{useState} from 'react'
import Sidebar from "../Components/Sidebar"

function EngineerSidebar() {

  let engineer = [
    {
      active:"active",
      link:"/engineer/dashboard",
      collapse:"#collapseOne",
      icon:"fa-border-all",
      title:"Dashboard"
    },
    {
      link:"/engineer/assignedusers",
      collapse:"#collapseTwo",
      icon:"fa-screwdriver-wrench",
      title:"Assigned Services"
    },
    {
      link:"/engineer/completedservices",
      collapse:"#collapseThree",
      icon:"fa-square-check",
      title:"Completed Services"
    },
    {
      link:"/profile",
      collapse:"#collapseFour",
      icon:"fa-user",
      title:"Profile"
    },
    {
      link:"/resetPassword",
      collapse:"#collapseFive",
      icon:"fa-key",
      title:"Reset Password"
    }
  ]

  return (
    <>
      <Sidebar data={engineer}/>
    </>
  )
}

export default EngineerSidebar