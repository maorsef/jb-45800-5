import { useEffect, useState } from 'react'
import './Followers.css'
import Follow from '../follow/Follow'
import useService from '../../../hooks/use-service'
import FollowersService from '../../../services/auth-aware/FollowersService'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { populate } from '../../../redux/followers-slice'
import Spinner from '../../common/spinner/Spinner'

export default function Followers() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  
  const followers = useAppSelector(state => state.followersSlice.followers)
  const dispatch = useAppDispatch()

  const followersService = useService(FollowersService)

  useEffect(() => {
    (async() => {
          try {
            setIsLoading(true)
            const following = await followersService.getFollowers()
            setIsLoaded(true)
            dispatch(populate(following))
          } catch (e) {
            setIsLoaded(false)
            alert(e)
          } finally {
            setIsLoading(false)
    
          }
        })()
  }, [])

  return (
    <div className='Followers'>

        {isLoading && <Spinner />}

        {!isLoading && !isLoaded && <h4>error loading following...</h4>}

        {!isLoading && isLoaded && <>
            {followers.map(follow => <Follow 
                key={follow.id} 
                user={follow}
            />)}

        </>}

    </div>
  )
}
