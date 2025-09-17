import './projectContainer.scss'
import Project from "../Project/Project.jsx";
import {useSelector} from "react-redux";
import {sortApiAscending} from "../../../utils/aids.js";
import EditProject from "../EditProject/EditProject.jsx";
import {useState} from "react";
import {data} from "react-router";


export default function ProjectsContainer({sectionId, user}) {
    const projects = useSelector((s) => s.projects.items)
        .filter((project) => project.section === sectionId)
        .sort(sortApiAscending())
    const [editProject, setEditProject] = useState(false)

    const handleAddProject = () => setEditProject(!editProject)

    if (!user && projects.length === 0) return null;

    return <>
        <div className="projects-container">

            {!projects.length && user && <div className='no-projects'>
                <button type='button' onClick={() => setEditProject(true)}>Add your projects here</button>
            </div>}

            {projects.map((project, index) => (
                <Project key={`Project: ${project.id}`} project={project} projects={projects} index={index} user={user}/>
            ))}
            {user && <div>
                {(projects.length > 0) && <button
                    className='edit-buttons' id='add-project'
                    onClick={handleAddProject}>Add Project</button>}
                {editProject &&
                    <EditProject data={{...data, section: sectionId}} close={handleAddProject} actionProject={'add'}/>}
            </div>
            }

        </div>

    </>
}