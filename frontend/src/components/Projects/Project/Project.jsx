import './project.scss'
import {useRef, useState} from "react";
import LinksContainer from "../../Links/LinksContainer.jsx";
import useClickAway from "../../../utils/eventListener.js";
import {useDispatch, useSelector} from "react-redux";
import EditProject from "../EditProject/EditProject.jsx";
import {data} from "react-router";
import {editProject} from "../../../slices/projectSlice.js";
import {moveModel} from "../../../utils/aids.js";

export default function Project({project, projects, index}){
    const [editTheProject, setEditProject] = useState(false)
    const [open, setOpen] = useState(false)

    const user = useSelector((s) => s.auth.user)
    const dispatch = useDispatch()
    const moveProject = moveModel(projects, editProject, dispatch)


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
        <div className='head-wrapper'>
        <h3>{project.name}</h3>

        <div className='direct-wrapper'>
        {index > 0 &&
            <button type='button' className='index-buttons' onClick={() => moveProject(index, 0)}>←</button>}
        {(index < projects.length-1) &&
            <button type='button' className='index-buttons' onClick={() => moveProject(index, projects.length-1)}>→</button>}
        </div>
            </div>

        {project.view || project.view_code && <div className="actions">
            <LinksContainer project={project}/>
        </div>}
        {editTheProject && <EditProject close={()=>setEditProject(false)}
                                     actionProject={'edit'}
                                    data={{...data,  name: project.name,
                                        projectId: project.id,
                                        image_url: project.image,
                                        section: project.section}}/>}

    </span>
}