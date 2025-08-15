import './projectContainer.scss'
import Project from "../Project/Project.jsx";

export default function ProjectsContainer(){
    const projects = [{"id": 1,
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe",
                                                "image": "assets/photo"}]
    return <>
        {projects.map((project)=> (
            <Project key={project.id} project={project}/>
        ))}
    </>
}