import './Login.css'
import type LoginModel from '../../../models/Login'
import authService from '../../../services/auth'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import AuthContext from '../auth/AuthContext'

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
            <form onSubmit={handleSubmit(login)}>
                <input placeholder='username' {...register('username')}/>
                <input type="password" placeholder='password' {...register('password')}/>
                <button>Login</button>

            </form>
        </div>
    )

}