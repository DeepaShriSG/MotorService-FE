import React from 'react'
import Sidebar from "../Components/Sidebar"

function AdminSidebar() {

    let admin = [
        {
          active:"active",
          link:"/admin/dashboard",
          collapse:"#collapseOne",
          icon:"fa-border-all",
          title:"Dashboard"
        },
        {
          link:"/admin/servicerequests",
          collapse:"#collapseTwo",
          icon:"fa-calendar",
          title:"Service Requests"
        },
        {
          link:"/admin/allusers",
          collapse:"#collapseThree",
          icon:"fa-square-check",
          title:"All users"
        },
        {
          link:"/admin/allengineers",
          collapse:"#collapseFour",
          icon:"fa-screwdriver-wrench",
          title:"All Engineers"
        },
        {
          link:"/admin/addengineers",
          collapse:"#collapseFive",
          icon:"fa-user-plus",
          title:"Add Engineers"
        },
        {
            link:"/profile",
            collapse:"#collapseSix",
            icon:"fa-user",
            title:"Profile"
        },
        {
          link:"/resetPassword",
          collapse:"#collapseSeven",
          icon:"fa-key",
          title:"Reset Password"
        }
      ]


  return (
    <> <Sidebar data={admin}/>
    </>
  )
}

export default AdminSidebar