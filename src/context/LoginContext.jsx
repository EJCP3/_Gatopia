import { createContext, useContext } from "react";

export const LoginContext = createContext()

export const useLogin = () => {
    const context = useContext(LoginContext)
    if(!context) throw new Error('useLogin must be used within a LoginContext')
    return context
}

export const LoginContextProvider = ({children}) => {
     return <LoginContext.Provider>{children}</LoginContext.Provider>
}