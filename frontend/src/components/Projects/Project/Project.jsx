import './project.scss'
import {useRef, useState} from "react";
import LinksContainer from "../../Links/LinksContainer.jsx";
import useClickAway, {clickSomewhere, useClickAnywhere} from "../../../utils/eventListener.js";
import {useDispatch} from "react-redux";
import EditProject from "../EditProject/EditProject.jsx";
import {data} from "react-router";
import {editProject} from "../../../slices/projectSlice.js";
import {moveModel} from "../../../utils/aids.js";

export default function Project({project, projects, index, user}) {
    const [editTheProject, setEditProject] = useState(false)
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const moveProject = moveModel(projects, editProject, dispatch)


    const projectRef = useRef(null)
    useClickAway(projectRef, () => {
        setOpen(false)
    })



    return <section className={`project ${open ? 'open' : ''}`} ref={projectRef}>

        {user && <img src='/edit2.png' alt='edit' className='edit-icon'
                      onClick={() => setEditProject(!editTheProject)}/>}

        <div className='image-frame'>
        <img className="project-image" src={project.image} alt={project.name} onClick={() => setOpen(true)}/>
            </div>
        <div className='head-wrapper'>
        <h3>{project.name}</h3>
            </div>

        {(project.view || project.view_code) && <div className="actions">
            <LinksContainer project={project}/>
        </div>}

        {editTheProject && <EditProject close={() => setEditProject(false)}
                                        actionProject={'edit'}
                                        moveUp={[() => moveProject(index, 0), index > 0]}
                                        moveDown={[() => moveProject(index, projects.length - 1), index < projects.length - 1]}
                                        data={{
                                            ...data, name: project.name,
                                            projectId: project.id,
                                            image_url: project.image,
                                            section: project.section,
                                            view: project.view,
                                            view_code: project.view_code
                                        }}/>}

    </section>
}