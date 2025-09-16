import api from "../../utils/api.js";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {logout, refresh} from "../../slices/authSlice.js";
import {loggedInState} from "../../slices/stateSlice.js";


export default function AuthInit() {
    const accessToken = localStorage.getItem("access-token") || null
    const refreshToken = localStorage.getItem("refresh-token") || null
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            if (!accessToken || !refreshToken) {
                dispatch(logout())
                return
            }
            try {
                await api.post('auth/verify/', {token: accessToken})
                console.log('You are logged in successfully!')
                dispatch(loggedInState())
            } catch (err) {

                try {
                    const response = await api.post('/auth/refresh/', {refresh: refreshToken})
                    const {access} = response.data
                    dispatch(refresh({accessToken: access}))
                    console.log('Access token renewed.');
                    window.location.reload()
                } catch (err2) {
                    dispatch(logout())
                    console.log('Your token is expired. Please log in again')
                    window.location.reload()
                }

            }

        })();
    }, [])

    return null

}