import './sidebar.scss'
import {useState} from "react";

export default function Sidebar(){
    const [image, setImage] = useState(true)

    return <>
        <div className="sidebar-container">
            {image && <div className="image-wrapper">
                <img className="profile" src="/serious%20(2).png" alt="profile"/>
                <button onClick={()=>setImage(false)}>{">"}</button>
            </div>}
            {!image && <div className="image-wrapper">
                <button onClick={()=>setImage(true)}>{"<"}</button>
                <img className="profile" src="/casual%20(2).png" alt="profile"/>

            </div>}
            <p><span className="welcome">Welcome to my website :)</span><br/><br/>Hi, I am <b>Nomi Lang</b>, a <b>Full-Stack developer</b><br/>-And <span className="much-more">so much more</span>! ↓</p>
            <h3 className="subject">About Me</h3>
            <h3 className="subject">Why I created this website</h3>
            <h3 className="subject">Group Projects</h3>
            <h3 className="subject">Study Projects</h3>

        </div>
    </>
}