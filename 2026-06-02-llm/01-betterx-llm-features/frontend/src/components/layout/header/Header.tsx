import { NavLink } from 'react-router-dom'
import './Header.css'
import useUsername from '../../../hooks/use-username'
import { useContext } from 'react'
import AuthContext from '../../auth/auth/AuthContext'
import Logo from '../../common/logo/Logo'

export default function Header() {

  const name = useUsername()
  const { logout } = useContext(AuthContext)!

  function logMeOut() {
    logout()
  }

  return (
    <div className='Header'>
      <div className='Header-brand'>
        <Logo size="sm" />
      </div>

      <nav className='Header-nav' aria-label="Main navigation">
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
        <NavLink to="/feed" className={({ isActive }) => isActive ? 'active' : ''}>Feed</NavLink>
      </nav>

      <div className='Header-user'>
        <span className='Header-welcome'>Welcome, <strong>{name}</strong></span>
        <button type="button" className="btn-secondary" onClick={logMeOut}>Logout</button>
      </div>
    </div>
  )
}
