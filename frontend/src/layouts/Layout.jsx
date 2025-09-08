import './layout.scss'
import Header from "../components/Header/Header.jsx";
import {Outlet} from "react-router";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {sideBarState} from "../slices/stateSlice.js";

export default function Layout(){
    const sideBar = useSelector((s)=>s.global.sideBar)
    const dispatch = useDispatch()
    return <>
        <Header/>
        <div className="layout-main">
            <p className='sidebar-control' onClick={() => dispatch(sideBarState())}>☺</p>
            {sideBar && <Sidebar/>}
            <div className="right-layout">
        <Outlet/>
                </div>
            </div>
    </>
}