import { Navigate, Route, Routes } from 'react-router-dom'
import Profile from '../../posts/profile/Profile'
import Feed from '../../posts/feed/Feed'
import NotFound from '../not-found/NotFound'
import UpdatePost from '../../posts/update-post/UpdatePost'

export default function Main() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/profile" />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/update-post/:postId" element={<UpdatePost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
