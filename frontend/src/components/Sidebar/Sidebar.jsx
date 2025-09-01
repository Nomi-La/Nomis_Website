import './sidebar.scss'
import {useState} from "react";
import {NavLink} from "react-router";
import {useSelector} from "react-redux";

export default function Sidebar(){
    const [image, setImage] = useState(true)
    const user = useSelector((s)=> s.auth.user)

    return <>
        <div className="sidebar-container">
            {image && <div className="image-wrapper">
                <img className="profile" src="/casual%20(2).png" alt="profile"/>
                <button className='arrow-small' onClick={()=>setImage(false)}>{">"}</button>
            </div>}
            {!image && <div className="image-wrapper">
                <button className='arrow-small' onClick={()=>setImage(true)}>{"<"}</button>
                <img className="profile" src="/serious%20(2).png" alt="profile"/>

            </div>}
            <p><span className="welcome">Welcome:)</span>
                <br/><br/>I am <b>Nomi Lang</b>, a <b>Full-Stack developer</b>
                <br/>-And <span className="much-more">so much more</span>! ↓</p>

            <NavLink className="subject" to="/projects">Projects</NavLink>
            <NavLink className="subject" to="">About Me</NavLink>
            <NavLink className="subject" to="/get-lost">Get Lost ♥</NavLink>
            <p className="subject" style={{"fontSize": "x-large", "fontWeight": "100"}}>©</p>

        </div>
    </>
}