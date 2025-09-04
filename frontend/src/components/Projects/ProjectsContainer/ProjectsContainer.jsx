import './projectContainer.scss'
import Project from "../Project/Project.jsx";
import {useSelector} from "react-redux";
import {sortApiAscending} from "../../../utils/aids.js";



export default function ProjectsContainer({sectionId}){
    const user = useSelector((s)=>s.auth.user)
    const projects = useSelector((s)=> s.projects.items)
                    .filter((project)=> project.section === sectionId)
                    .sort(sortApiAscending())


    return <>
        <div className="projects-container">
        {projects.map((project)=> (
            <Project key={`Project: ${project.id}`} project={project}/>
        ))}
            {user && <button className='edit-buttons' id='add-project'>Add Project</button>}
            </div>
    </>
}