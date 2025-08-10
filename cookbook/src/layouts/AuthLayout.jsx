import {Outlet} from "react-router"
import Sidebar from "../components/AuthSidebar/Sidebar"
import './authlayout.scss'
export default function AuthLayout () {
    return <>
    
                <Sidebar/>
                <div className="auth-right"><Outlet/></div>
        </>
}