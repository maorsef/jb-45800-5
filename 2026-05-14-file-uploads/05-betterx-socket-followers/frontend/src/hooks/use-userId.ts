import { useContext, useMemo } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import { jwtDecode } from "jwt-decode"
import type User from "../models/User"

export default function useUserId(): string {
    const { jwt } = useContext(AuthContext)! 

    const id = useMemo(() => {
        const { id } = jwtDecode<User>(jwt)
        return id
    }, [ jwt ])

    return id
}