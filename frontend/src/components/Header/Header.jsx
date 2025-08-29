import './header.scss'
import {useNavigate} from "react-router";
import Login from "../Auth/Login.jsx";
import {useState} from "react";

export default function Header(){
    const [log, setLog] = useState(false)
    const navigate = useNavigate()


    return <>
        <div className="header-sec">
            <img className="name-logo" src="/logo3.png" alt="logo-name" onClick={()=>navigate("/")}/>
            <img className="key-logo" src="/key2.png" alt="logo-star"
            onClick={()=> setLog(!log)}/>
            {log && <Login/>}
            {/*<img className="log-logo" src="/doors2.png" alt="logo-star"/>*/}
        </div>

    </>
}