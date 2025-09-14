import Welcome from "../components/Welcome/Welcome.jsx";
import Header from "../components/Header/Header.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {sideBarState} from "../slices/stateSlice.js";

export default function MainPage(){


    return <>
        <Welcome/>
    </>
}