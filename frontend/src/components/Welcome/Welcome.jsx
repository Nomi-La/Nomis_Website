import './welcome.scss'
import {useState} from "react";
import {Link} from "react-router";

export default function Welcome(){
    const [image, setImage] = useState(true)

    return <>
        <div className="main-page">
            {image && <div className="image-wrapper">
                <img className="profile" src="/beach.jpg" alt="profile"/>
            </div>}
            {!image && <div className="image-wrapper">
                <img className="profile" src="/casual5.png" alt="profile"/>

            </div>}
            <p className='intro-side'><span className="welcome">Welcome:)</span>
                <br/><br/>I am <b>Nomi Lang</b>, a <b>Full-Stack developer</b>
                <br/>-And <span className="much-more">so much more</span>! ↓</p>

            <section className='welcome-links'>
                <Link to='/projects' className='submit-button'>To My Projects</Link>
                <Link to='/about-me' className='submit-button'>About Me</Link>
            </section>
        </div>
    </>
}