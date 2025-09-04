import './project.scss'
import {useState} from "react";
import LinksContainer from "../../Links/LinksContainer.jsx";
export default function Project({project}){
    const [open, setOpen] = useState(false)

    return <div className="project">
        <div className='image-frame'>
        <img className="project-image" src={project.image} alt={project.name} onClick={()=>setOpen(!open)}/>
            </div>
        <h3>{project.name}</h3>
        {open && <LinksContainer projectId={project.id}/>}
    </div>
}