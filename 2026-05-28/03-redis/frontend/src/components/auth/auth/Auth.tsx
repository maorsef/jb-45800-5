import { useState, type PropsWithChildren } from "react"
import AuthContext from "./AuthContext"
import { v4 } from "uuid"

export default function Auth(props: PropsWithChildren) {

    const JWT_KEY_NAME = 'jwt'

    const [jwt, setJwt] = useState<string>(localStorage.getItem(JWT_KEY_NAME) || '')

    const [clientId] = useState<string>(v4())

    const { children } = props

    function saveJwt(jwt: string) {
        setJwt(jwt)
        localStorage.setItem(JWT_KEY_NAME, jwt)
    }

    function logout() {
        localStorage.removeItem(JWT_KEY_NAME)
        setJwt('')
    }

    return (
        <AuthContext.Provider value={{jwt, saveJwt, logout, clientId}}>
            {children}
        </AuthContext.Provider>    
    )
}