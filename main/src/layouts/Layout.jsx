import './layout.scss'
import Header from "../components/Header/Header.jsx";
import {Outlet} from "react-router";

export default function Layout(){
    return <>
        <Header/>
        <Outlet/>
    </>
}