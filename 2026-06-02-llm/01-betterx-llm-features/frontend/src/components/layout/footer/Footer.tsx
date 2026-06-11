import useUsername from '../../../hooks/use-username'
import './Footer.css'
import Logo from '../../common/logo/Logo'

export default function Footer() {

  const name = useUsername()

  return (
    <div className='Footer'>
      <Logo size="sm" showText={false} />
      <p className='Footer-text'>
        Signed in as <strong>{name}</strong>
        <span className='Footer-sep'>·</span>
        {import.meta.env.VITE_REST_SERVER_URL}
      </p>
    </div>
  )
}
