import { useEffect, useState } from 'react'
import './Profile.css'
// import profileService from '../../../services/profile'
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

        // profileService.getProfile()
        //     .then(profile => setProfile(profile.sort((a: PostModel, b: PostModel) => a.createdAt < b.createdAt ? 1 : -1)))
        //     .catch(e => alert(e.message))

        (async() => {
            try {
                if(profile.length > 0) {
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

            {isLoading && <Spinner />}

            {!isLoading && isLoaded && <>
                <NewPost />
                {profile.map(post => <Post 
                    key={post.id} 
                    post={post} 
                    isReadOnly={false} 
                />)}
            </>}

            {!isLoading && !isLoaded && <div>
                <h4>error loading data...</h4>
            </div>}

            
        </div>
    )
}