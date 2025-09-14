import './project.scss'
import {useRef, useState} from "react";
import LinksContainer from "../../Links/LinksContainer.jsx";
import useClickAway from "../../../utils/eventListener.js";
import {useSelector} from "react-redux";
import EditProject from "../EditProject/EditProject.jsx";
import {data} from "react-router";

export default function Project({project}){
    const [editProject, setEditProject] = useState(false)
    const [open, setOpen] = useState(false)
    const user = useSelector((s) => s.auth.user)
    const links = useSelector((s)=>s.links.items)
                 .filter((link)=> link.project_id===project.id)
                 .sort((a, b) => a.id - b.id)

    const projectRef = useRef(null)
    useClickAway(projectRef, ()=> {
        setOpen(false)
    })

    return <span className={`project ${open ? 'open' : ''}`} ref={projectRef}>
        {user && <img src='/edit2.png' alt='edit' className='edit-icon'
        onClick={()=>setEditProject(true)}/>}
        <div className='image-frame'>
        <img className="project-image" src={project.image} alt={project.name} onClick={()=>setOpen(!open)}/>
            </div>
        <h3>{project.name}</h3>
        {links && <div className="actions">
            <LinksContainer links={links}/>
        </div>}
        {editProject && <EditProject close={()=>setEditProject(false)}
                                     actionProject={'Edit Project'}
                                    data={{...data,  name: project.name,
                                        projectId: project.id,
                                        image_url: project.image,
                                        section: project.section}}/>}

    </span>
}