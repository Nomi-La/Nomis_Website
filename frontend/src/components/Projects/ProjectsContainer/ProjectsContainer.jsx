import './projectContainer.scss'
import Project from "../Project/Project.jsx";
import {useSelector} from "react-redux";
import {sortApiAscending} from "../../../utils/aids.js";
import EditProject from "../EditProject/EditProject.jsx";
import {useState} from "react";



export default function ProjectsContainer({sectionId}){
    const user = useSelector((s)=>s.auth.user)
    const projects = useSelector((s)=> s.projects.items)
                    .filter((project)=> project.section === sectionId)
                    .sort(sortApiAscending())
    const [editProject, setEditProject] = useState(false)

    const handleAddProject = () => setEditProject(!editProject)

    return <>
        <div className="projects-container">
        {projects.map((project)=> (
            <Project key={`Project: ${project.id}`} project={project}/>
        ))}
            {user && <div>
                <button
                    className='edit-buttons' id='add-project'
                    onClick={handleAddProject}>Add Project</button>
                {editProject && <EditProject sectionId={sectionId} close={handleAddProject}/>}
            </div>
            }

            </div>

    </>
}