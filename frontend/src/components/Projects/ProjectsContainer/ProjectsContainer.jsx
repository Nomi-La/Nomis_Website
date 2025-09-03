import './projectContainer.scss'
import Project from "../Project/Project.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProjects} from "../../../slices/projectSlice.js";


export default function ProjectsContainer({sectionId}){
    const projects = useSelector((s)=> s.projects.items)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProjects({section: sectionId}))
    }, [])

    return <>
        <div className="projects-container">
        {projects.map((project)=> (
            <Project key={`Project: ${project.id}`} project={project}/>
        ))}
            </div>
    </>
}