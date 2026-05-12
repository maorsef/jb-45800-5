import { useContext } from 'react'
import Followers from '../../follows/followers/Followers'
import Following from '../../follows/following/Following'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Main from '../main/Main'
import './Layout.css'
import Login from '../../auth/login/Login'
import AuthContext from '../../auth/auth/AuthContext'

export default function Layout() {

    const { jwt } = useContext(AuthContext)!

    return (
        <div className='Layout'>

            {!jwt && <Login />}

            {jwt && <>
                <header>
                    <Header />
                </header>

                <aside id="following">
                    <Following />
                </aside>

                <aside id="followers">
                    <Followers />
                </aside>

                <main>
                    <Main />
                </main>

                <footer>
                    <Footer />
                </footer>
            </>}

        </div>
    )
}