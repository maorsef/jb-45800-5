import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
    return (
        <div className='NotFound'>
            <div className='NotFound-code'>404</div>
            <h2 className='NotFound-title'>Page not found</h2>
            <p className='NotFound-desc'>The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/profile" className='NotFound-link'>Back to Profile</Link>
        </div>
    )
}
