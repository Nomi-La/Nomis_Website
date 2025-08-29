import './login.scss'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login, logout} from "../../slices/authSlice.js";
import {Link} from "react-router";
import api from "../../axios/api.js";

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [error, setError] = useState('')

    const dispatch = useDispatch()
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('access-token')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/token/', {
                email,
                password,
            });

            const {access, refresh, user} = response.data

            dispatch(
                login({
                    user,
                    accessToken: access,
                    refreshToken: refresh
                })
            )

        } catch (err) {
            console.error(err)
            setError('Invalid email or password')
        }
    };

    return <>
        <div className='login-sec'>
            {!user && !token &&
                <form className='signin-form' onSubmit={handleSubmit}>

                <input
                    type='email'
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="error-mes">{error}</p>}

                <button type='submit' className="login-button">Login</button>

                {/*<Link to='/signup'>signup</Link>*/}
                {/*<Link to='/reset-password'>forgot password?</Link>*/}

            </form>
            }
            {user && token && <></>}
        </div>
    </>
}