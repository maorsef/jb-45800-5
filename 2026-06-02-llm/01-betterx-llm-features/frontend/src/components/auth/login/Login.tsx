import './Login.css'
import type LoginModel from '../../../models/Login'
import authService from '../../../services/auth'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'
import Logo from '../../common/logo/Logo'

export default function Login() {

    const { saveJwt } = useContext(AuthContext)!

    async function login(login: LoginModel) {
        try {
            const { jwt } = await authService.login(login)
            saveJwt(jwt)
        } catch (e) {
            alert(e)
        }
    }

    const { register, handleSubmit } = useForm<LoginModel>()

    return (
        <div className='Login'>
            <div className='Login-bg' aria-hidden="true">
                <div className='Login-bg-shape Login-bg-shape--1' />
                <div className='Login-bg-shape Login-bg-shape--2' />
                <div className='Login-bg-shape Login-bg-shape--3' />
                <div className='Login-bg-grid' />
            </div>

            <div className='Login-card'>
                <div className='Login-header'>
                    <Logo size="lg" />
                    <h1 className='Login-title'>Welcome back</h1>
                    <p className='Login-subtitle'>Sign in to share your stories with the world</p>
                </div>

                <form className='Login-form' onSubmit={handleSubmit(login)}>
                    <div className='form-group'>
                        <label className='form-label' htmlFor="username">Username</label>
                        <input
                            id="username"
                            placeholder='Enter your username'
                            autoComplete="username"
                            {...register('username')}
                        />
                    </div>

                    <div className='form-group'>
                        <label className='form-label' htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder='Enter your password'
                            autoComplete="current-password"
                            {...register('password')}
                        />
                    </div>

                    <button type="submit" className='Login-submit btn-primary'>Sign In</button>
                </form>
            </div>
        </div>
    )
}
