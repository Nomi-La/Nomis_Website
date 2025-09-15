import './projectContainer.scss'
import Project from "../Project/Project.jsx";
import {useSelector} from "react-redux";
import {sortApiAscending} from "../../../utils/aids.js";
import EditProject from "../EditProject/EditProject.jsx";
import {useState} from "react";
import {data} from "react-router";



export default function ProjectsContainer({sectionId}){
    const user = useSelector((s)=>s.auth.user)
    const projects = useSelector((s)=> s.projects.items)
                    .filter((project)=> project.section === sectionId)
                    .sort(sortApiAscending())
    const [editProject, setEditProject] = useState(false)

    const handleAddProject = () => setEditProject(!editProject)

    return <>
        <div className="projects-container">
        {projects.map((project, index)=> (
            <Project key={`Project: ${project.id}`} project={project} projects={projects} index={index}/>
        ))}
            {user && <div>
                <button
                    className='edit-buttons' id='add-project'
                    onClick={handleAddProject}>Add Project</button>
                {editProject && <EditProject data={{...data, section: sectionId}} close={handleAddProject} actionProject={'add'}/>}
            </div>
            }

            </div>

    </>
}