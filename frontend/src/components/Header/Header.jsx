import './header.scss'
import {useNavigate} from "react-router";
import Login from "../Auth/Login.jsx";

export default function Header(){
    const navigate = useNavigate()


    return <>
        <div className="header-sec">
            <img className="name-logo" src="/logo3.png" alt="logo-name" onClick={()=>navigate("/")}/>
            <Login/>
        </div>

    </>
}