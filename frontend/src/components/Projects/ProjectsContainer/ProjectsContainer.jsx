import './projectContainer.scss'
import Project from "../Project/Project.jsx";
import {useSelector} from "react-redux";



export default function ProjectsContainer({sectionId}){
    const projects = useSelector((s)=> s.projects.items)
                    .filter((project)=> project.section === sectionId)
                    .sort((a, b) => a.id - b.id)


    return <>
        <div className="projects-container">
        {projects.map((project)=> (
            <Project key={`Project: ${project.id}`} project={project}/>
        ))}
            </div>
    </>
}