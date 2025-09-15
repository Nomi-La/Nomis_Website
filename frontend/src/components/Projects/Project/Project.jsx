import './project.scss'
import {useRef, useState} from "react";
import LinksContainer from "../../Links/LinksContainer.jsx";
import useClickAway from "../../../utils/eventListener.js";
import {useDispatch, useSelector} from "react-redux";
import EditProject from "../EditProject/EditProject.jsx";
import {data} from "react-router";
import {projectDown, projectUp} from "../../../slices/projectSlice.js";

export default function Project({project}){
    const [editProject, setEditProject] = useState(false)
    const [open, setOpen] = useState(false)
    const user = useSelector((s) => s.auth.user)
    const dispatch = useDispatch()

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
        <button type='button' onClick={()=> dispatch(projectUp({id: project.id, sectionId: project.section}))}>←</button>
        <button type='button' onClick={()=> dispatch(projectDown({id: project.id, sectionId: project.section}))}>→</button>

        {project.view || project.view_code && <div className="actions">
            <LinksContainer project={project}/>
        </div>}
        {editProject && <EditProject close={()=>setEditProject(false)}
                                     actionProject={'Edit Project'}
                                    data={{...data,  name: project.name,
                                        projectId: project.id,
                                        image_url: project.image,
                                        section: project.section}}/>}

    </span>
}