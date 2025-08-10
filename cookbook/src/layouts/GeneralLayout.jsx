import {Outlet} from "react-router"
import Header from "../components/Header/Header"
import './generalLayout.scss'

export default function GeneralLayout () {
    return <>
                <Header/>
                <div className="general-outlet">
                <Outlet/>
                </div>
        </>
}