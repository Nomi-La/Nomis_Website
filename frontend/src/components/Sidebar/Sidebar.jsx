import './sidebar.scss'
import {useEffect, useState} from "react";
import {NavLink} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../../slices/categorySlice.js";
import SectionName from "./SectionName.jsx";

export default function Sidebar(){

    const [image, setImage] = useState(true)
    const dispatch = useDispatch()

    const categories = useSelector((s) => s.categories.items)

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    return <>
        <div className="sidebar-container">
            {image && <div className="image-wrapper">
                <img className="profile" src="/casual%20(2).png" alt="profile"/>
                <button className='arrow-small' onClick={()=>setImage(false)}>{">"}</button>
            </div>}
            {!image && <div className="image-wrapper">
                <button className='arrow-small' onClick={()=>setImage(true)}>{"<"}</button>
                <img className="profile" src="/serious%20(2).png" alt="profile"/>

            </div>}
            <p><span className="welcome">Welcome:)</span>
                <br/><br/>I am <b>Nomi Lang</b>, a <b>Full-Stack developer</b>
                <br/>-And <span className="much-more">so much more</span>! ↓</p>
            {[...(categories ?? [])].sort((a, b) => a.id - b.id)
                .filter((category)=> category.name.toLowerCase() !== 'plan')
                .map((category)=> <>
                <NavLink className="subject" key={`Category: ${category.id}`} to={`/${category.name}`}>{category.name}</NavLink>
                <SectionName categoryId={category.id}/>
            </>)}
            <p className="subject" style={{"fontSize": "x-large", "fontWeight": "100"}}>©</p>

        </div>
    </>
}