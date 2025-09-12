import './sidebar.scss'
import { useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CategorySide from "./CategorySide.jsx";
import {sideBarState} from "../../slices/stateSlice.js";
import {NavLink, useNavigate} from "react-router";


export default function Sidebar(){
    const [image, setImage] = useState(true)
    const categories = useSelector((s) => s.categories.items)
                       .filter((category)=> category.name.toLowerCase() !== 'plan')
                        .sort((a, b) => a.id - b.id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const hide = 'Hide <'

    return <>
        <div className="sidebar-container">
            <p className='hide-sidebar'
            onClick={()=>dispatch(sideBarState())}>{hide}</p>


            {image && <div className="image-wrapper">
                <img className="profile" src="/casual3.png" alt="profile"/>
                <button className='arrow-small' onClick={()=>setImage(false)}>{">"}</button>
            </div>}
            {!image && <div className="image-wrapper">
                <button className='arrow-small' onClick={()=>setImage(true)}>{"<"}</button>
                <img className="profile" src="/serious3.png" alt="profile"/>

            </div>}
            <h1 className="username" onClick={()=>navigate('/')}>Nomi Lang</h1>


                <NavLink to='/' className='category'>Main</NavLink>
                {categories.map((category)=> <>
                    <CategorySide category={category}/>
                </>)}

            <p className="category" style={{"fontSize": "x-large", "fontWeight": "100"}}>©</p>

        </div>
    </>
}