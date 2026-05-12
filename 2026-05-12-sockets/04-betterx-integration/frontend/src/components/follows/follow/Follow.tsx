import type User from '../../../models/User'
import './Follow.css'
import profilePic from '../../../assets/profile-pic.jpg'
import useService from '../../../hooks/use-service'
import FollowingService from '../../../services/auth-aware/FollowingService'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { follow, unfollow } from '../../../redux/following-slice'

interface FollowProps {
    user: User
}
export default function Follow(props: FollowProps) {

    const { user, user: { id, name, username }} = props
    
    const isFollowing = useAppSelector(state => state.followingSlice.following.findIndex(follow => follow.id === id) > -1 )

    const followingService = useService(FollowingService)

    const dispatch = useAppDispatch()

    async function unfollowMe() {
        try {
            await followingService.unfollow(id)
            dispatch(unfollow({id}))

        } catch (e) {
            alert(e)
        }
    }

    async function followMe() {
        try {
            await followingService.follow(id)
            dispatch(follow(user))

        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Follow'>
            <div><img src={profilePic} /></div>
            <div>{name}</div>
            <div>{username}</div>
            {isFollowing && <div><button onClick={unfollowMe}>Unfollow</button></div>}
            {!isFollowing && <div><button onClick={followMe}>follow</button></div>}
            
        </div>
    )
}