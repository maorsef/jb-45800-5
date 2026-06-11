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
    (async () => {
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
      <h3 className='section-title'>Following</h3>

      {isLoading && <Spinner />}

      {!isLoading && !isLoaded && (
        <p className='empty-state'>Could not load following</p>
      )}

      {!isLoading && isLoaded && following.length === 0 && (
        <p className='empty-state'>Not following anyone yet</p>
      )}

      {!isLoading && isLoaded && following.length > 0 && (
        <div className='Following-list'>
          {following.map(follow => (
            <Follow key={follow.id} user={follow} />
          ))}
        </div>
      )}
    </div>
  )
}
