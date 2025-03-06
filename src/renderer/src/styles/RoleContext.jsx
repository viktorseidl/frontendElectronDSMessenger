import { util } from 'node-forge'
import React, { createContext, useState, useContext, useEffect } from 'react'

const RoleContext = createContext()

export const RoleProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState([])
  function hasPermission(permission) {
    return userRoles.includes(permission)
  }
  useEffect(() => {
    if (window.sessionStorage.getItem('userRole')) {
      const Roles = JSON.parse(util.decode64(window.sessionStorage.getItem('userRole')))
      console.log(Roles)
      setUserRoles(Roles)
    }
  }, [])

  return (
    <RoleContext.Provider value={{ userRoles, setUserRoles, hasPermission }}>
      {children}
    </RoleContext.Provider>
  )
}
export const useRoles = () => useContext(RoleContext)
