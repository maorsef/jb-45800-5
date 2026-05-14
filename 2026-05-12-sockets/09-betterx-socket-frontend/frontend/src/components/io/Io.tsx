import { useEffect, type PropsWithChildren } from "react"
import { SocketMessages } from "socket-enums-shaharsol-xyz"
import { io } from "socket.io-client"
import { useAppDispatch } from "../../redux/hooks"
import { add } from "../../redux/profile-slice"
import type Post from "../../models/Post"

export default function Io(props: PropsWithChildren) {

    const { children } = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        const socket = io(import.meta.env.VITE_IO_SERVER_URL)
        console.log('client started listening for socket messages')
        socket.onAny((eventName: string, payload: object) => {
            console.log(`got a ${eventName} socket message`, payload)
            console.log(eventName)
            console.log(SocketMessages.NEW_POST)
            switch (eventName) {
                case "NEW_FOLLOW": 
                    break;
                case "NEW_POST":
                    console.log('dispatching the NEW_POST')
                    dispatch(add(payload as Post)) 
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