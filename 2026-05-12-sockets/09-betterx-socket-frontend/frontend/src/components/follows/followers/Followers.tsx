import { useEffect, useState } from 'react'
import './Followers.css'
import type User from '../../../models/User'
import Follow from '../follow/Follow'
import useService from '../../../hooks/use-service'
import FollowersService from '../../../services/auth-aware/FollowersService'

export default function Followers() {

  const [followers, setFollowers] = useState<User[]>([])

  const followersService = useService(FollowersService)

  useEffect(() => {
    followersService.getFollowers()
      .then(setFollowers)
      .catch(alert)
  }, [])

  return (
    <div className='Followers'>
      {followers.map(follow => <Follow 
        key={follow.id} 
        user={follow}
      />)}
    </div>
  )
}
