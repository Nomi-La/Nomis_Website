import './layout.scss'
import Header from "../components/Header/Header.jsx";
import {Outlet} from "react-router";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

export default function Layout(){
    return <>
        <Header/>
        <Sidebar/>
        <Outlet/>
    </>
}