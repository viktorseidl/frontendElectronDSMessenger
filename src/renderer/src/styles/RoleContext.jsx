import React, { createContext, useState, useContext, useEffect } from 'react'

const RoleContext = createContext()

export const RoleProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState([])
  function hasPermission(permission) {
    return userRoles.includes(permission)
  }
  useEffect(() => {}, [])

  return (
    <RoleContext.Provider value={{ userRoles, setUserRoles, hasPermission }}>
      {children}
    </RoleContext.Provider>
  )
}
export const useRoles = () => useContext(RoleContext)
