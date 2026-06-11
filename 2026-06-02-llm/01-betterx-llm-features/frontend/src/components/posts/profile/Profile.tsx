import { useEffect, useState } from 'react'
import './Profile.css'
import Post from '../post/Post'
import NewPost from '../new/NewPost'
import Spinner from '../../common/spinner/Spinner'
import useService from '../../../hooks/use-service'
import ProfileService from '../../../services/auth-aware/ProfileService'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { populate } from '../../../redux/profile-slice'

export default function Profile() {

    const profile = useAppSelector(state => state.profileSlice.posts)
    const dispatch = useAppDispatch()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const profileService = useService(ProfileService)

    useEffect(() => {
        (async () => {
            try {
                if (profile.length > 0) {
                    setIsLoaded(true)
                } else {
                    setIsLoading(true)
                    const profile = await profileService.getProfile()
                    setIsLoaded(true)
                    dispatch(populate(profile))
                }
            } catch (e) {
                setIsLoaded(false)
                alert(e)
            } finally {
                setIsLoading(false)
            }
        })()
    }, [])

    return (
        <div className='Profile'>
            <header className='page-header'>
                <h2 className='page-title'>Your Profile</h2>
                <p className='page-subtitle'>Create posts and manage your content</p>
            </header>

            {isLoading && <Spinner />}

            {!isLoading && isLoaded && <>
                <NewPost />
                {profile.map(post => (
                    <Post key={post.id} post={post} isReadOnly={false} />
                ))}
            </>}

            {!isLoading && !isLoaded && (
                <p className='empty-state'>Something went wrong loading your profile.</p>
            )}
        </div>
    )
}
