import './login.scss'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../../slices/authSlice.js";
import {Link} from "react-router";
import api from "../../axios/api.js";

export default function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword]= useState('')
    const [error, setError] = useState('')
    const [log, setLog] = useState(false)

    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.accessToken)
    const user = useSelector((state) => state.auth.user)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/token/', {
                email,
                password,
            });

            const {access, refresh} = response.data

            dispatch(
                login({
                    user,
                    accessToken: access,
                    refreshToken: refresh
                })
            )
            setLog(false)
        } catch (err) {
          if (err.response) {
            const data = err.response.data;

            let message = "";
            if (typeof data === "string") {
              message = data;
            } else if (data.detail) {
              message = data.detail;
            } else if (typeof data === "object") {
              message = Object.values(data).flat().join(" ");
            } else {
              message = "An error occurred.";
            }

            console.error(message);
            setError(message);
          } else {
            setError("Network error, please try again.");
          }}
    };

    const handleLogout = () => {
        dispatch(logout())
        setLog(false)
    }

    return <>
        {token && <img className="log-logo" src="/door2.png" alt="logo-star"
              onClick={() => setLog(!log)}/>}
        {!token && <img className="key-logo" src="/key2.png" alt="logo-star"
              onClick={() => setLog(!log)}/>}

        { !token && log &&
            <div className='login-sec'>
            <form className='signin-form' onSubmit={handleSubmit}>

            <input
                className='input'
                type='email'
                placeholder='email'
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className='input'
                type='password'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error-mes">{error}</p>}

            <button type='submit' className="login-button">Login</button>

            {/*<Link to='/signup'>signup</Link>*/}
            {/*<Link to='/reset-password'>forgot password?</Link>*/}

        </form>
            </div>
            }
        {token && log &&
            <div className='login-sec'>
            <button className='login-button' onClick={handleLogout}>logout</button>
            </div>
        }
    </>
}