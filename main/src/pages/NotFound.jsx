import './notFound.scss'
import Header from "../components/Header/Header.jsx";
import {Link} from "react-router";

export default function NotFound(){
    return <>
        <Header/>
        <div className="not-found">
            <div className="oops-wrapper">
                <h2>Oops! you seem a bit lost</h2>
                 <img className="emoji" src="/logo%20(24).png" alt="emoji"/>
                </div>

            <div className="oops-wrapper">

                 <img src="/logo%20(23).png" alt="emoji" className="emoji2"/>
                <Link to="/">Go Back!<br/>←</Link>
                </div>
            </div>
    </>
}