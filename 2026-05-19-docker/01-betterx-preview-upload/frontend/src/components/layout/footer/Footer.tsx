import useUsername from '../../../hooks/use-username'
import './Footer.css'

export default function Footer() {

  const name = useUsername()
  
  return (
    <div className='Footer'>
      <p>hello { name }</p>
      <p>current server: {import.meta.env.VITE_REST_SERVER_URL}</p>
    </div>
  )
}
