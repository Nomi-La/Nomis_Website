import './notFound.scss'
import Header from "../components/Header/Header.jsx";
import {Link} from "react-router";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

export default function NotFound(){
    return <>
        <Header/>
        <div className="not-found">
            <h1>404</h1>
            {/*<img src="/logo%20(27).png" alt="404" className="not404"/>*/}
            <div className="oops-wrapper">
                <h2>Oops! you seem a bit lost</h2>

                </div>

            <div className="oops-wrapper">

                 <img src="/logo%20(23).png" alt="emoji" className="emoji2"/>
                <Link to="/">Go Back!<br/>←</Link>
                </div>
            </div>
    </>
}