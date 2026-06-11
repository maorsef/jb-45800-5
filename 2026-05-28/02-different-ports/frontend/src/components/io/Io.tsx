import { useContext, useEffect, type PropsWithChildren } from "react"
import { SocketMessages } from "socket-enums-shaharsol-xyz"
import { io } from "socket.io-client"
import { useAppDispatch } from "../../redux/hooks"
import { add } from "../../redux/profile-slice"
import type Post from "../../models/Post"
import AuthContext from "../auth/auth/AuthContext"
import useUserId from "../../hooks/use-userId"
import { newFollower } from "../../redux/followers-slice"
import type User from "../../models/User"

export default function Io(props: PropsWithChildren) {

    const { clientId } = useContext(AuthContext)!
    const userId = useUserId()

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
                        // if the new follow record contains a followeeId which is mine
                        // it means i have a new follower
                        // it means i need to dispatch the newFollower action
                        // to the redux (followers slice)
                        const follow = payload.follow 
                        if(follow.followeeId === userId ) {
                            // here i want to dispatch
                            dispatch(newFollower(follow.follower as User))
                        }
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