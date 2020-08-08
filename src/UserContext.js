import React from "react"

const UserContext = React.createContext(["User", ()=>{}])

export const DisplayContext = React.createContext(["Display", ()=>{}])

export default UserContext
