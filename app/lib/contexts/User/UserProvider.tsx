
import React from "react"
import { reducer, initialState } from "./reducer"
import { UserContext } from "./UserContext"


export const UserProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <UserContext.Provider value={[ state, dispatch ]}>
    	{ children }
    </UserContext.Provider>
  )
}

