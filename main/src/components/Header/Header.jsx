import './header.scss'
import {useNavigate} from "react-router";

export default function Header(){
    const navigate = useNavigate()
    return <>
        <div className="header-sec">
            <img className="name-logo" src="/name2.png" alt="logo-name" onClick={()=>navigate("/")}/>
            {/*<img className="star-logo" src="/logo%20(13).png" alt="logo-star"/>*/}
        </div>
    </>
}