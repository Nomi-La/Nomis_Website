import './project.scss'
import {useEffect, useRef, useState} from "react";
import LinksContainer from "../../Links/LinksContainer.jsx";
import useClickAway from "../../../utils/eventListener.js";

export default function Project({project}){
    const [open, setOpen] = useState(false)
    // const [projectRef, setProjectRef] = useState('')
    //
    // useEffect(()=>{setProjectRef(project.id)},[])
    const projectRef = useRef(null)
    useClickAway(projectRef, ()=> setOpen(false))

    return <span className={`project ${open ? 'open' : ''}`} ref={projectRef}>
        <div className='image-frame'>
        <img className="project-image" src={project.image} alt={project.name} onClick={()=>setOpen(!open)}/>
            </div>
        <h3>{project.name}</h3>
          <div className="actions">
                <LinksContainer projectId={project.id}/>
          </div>
    </span>
}