import { useContext, useEffect, type PropsWithChildren } from "react"
import { SocketMessages } from "socket-enums-shaharsol-xyz"
import { io } from "socket.io-client"
import { useAppDispatch } from "../../redux/hooks"
import { add } from "../../redux/profile-slice"
import type Post from "../../models/Post"
import AuthContext from "../auth/auth/AuthContext"

export default function Io(props: PropsWithChildren) {

    const { clientId } = useContext(AuthContext)!

    const { children } = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_IO_SERVER_URL)
        console.log('client started listening for socket messages')
        socket.onAny((eventName: string, payload: any) => {
            console.log(`got a ${eventName} socket message`, payload)
            console.log(eventName)
            console.log(SocketMessages.NEW_POST)
            switch (eventName) {
                case SocketMessages.NEW_FOLLOW: 
                    if(clientId !== payload.clientId) {
                        
                    }
                    break;
                case SocketMessages.NEW_POST:
                    if(clientId !== payload.clientId) {
                        console.log('dispatching the NEW_POST')
                        dispatch(add(payload.post as Post)) 
                    }
                    break;
            }
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <>
            {children}
        </>
    )
}