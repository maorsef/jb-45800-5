import { useEffect, useState } from 'react'
import './Following.css'
import Follow from '../follow/Follow'
import Spinner from '../../common/spinner/Spinner'
import useService from '../../../hooks/use-service'
import FollowingService from '../../../services/auth-aware/FollowingService'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { populate } from '../../../redux/following-slice'

export default function Following() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const followingService = useService(FollowingService)
  
  const dispatch = useAppDispatch()
  const following = useAppSelector(state => state.followingSlice.following)

  useEffect(() => {

    (async() => {
      try {
        setIsLoading(true)
        const following = await followingService.getFollowing()
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
    <div className='Following'>

      {isLoading && <Spinner />}

      {!isLoading && !isLoaded && <h4>error loading following...</h4>}

      {!isLoading && isLoaded && <>
        {following.map(follow => <Follow 
          key={follow.id} 
          user={follow}
        />)}
      </>}
    </div>
  )
}
