import './sidebar.scss'
import { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CategorySide from "./CategorySide.jsx";
import {sideBarState} from "../../slices/stateSlice.js";


export default function Sidebar(){
    const [image, setImage] = useState(true)
    const categories = useSelector((s) => s.categories.items)
                       .filter((category)=> category.name.toLowerCase() !== 'plan')
                        .sort((a, b) => a.id - b.id)
    const dispatch = useDispatch()
    const hide = 'Hide <'

    return <>
        <div className="sidebar-container">
            <p className='hide-sidebar'
            onClick={()=>dispatch(sideBarState())}>{hide}</p>
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

                {categories.map((category)=> <>
                    <CategorySide category={category}/>
                </>)}

            <p className="category" style={{"fontSize": "x-large", "fontWeight": "100"}}>©</p>

        </div>
    </>
}