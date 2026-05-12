import { useContext, useMemo } from "react"
import AuthContext from "../components/auth/auth/AuthContext"
import { jwtDecode } from "jwt-decode"
import type User from "../models/User"

export default function useUsername(): string {
    const { jwt } = useContext(AuthContext)! 

    const name = useMemo(() => {
        const { name } = jwtDecode<User>(jwt)
        return name
    }, [ jwt ])

    return name
}