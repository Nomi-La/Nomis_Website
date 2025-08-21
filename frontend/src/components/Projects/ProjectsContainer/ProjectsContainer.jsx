import './projectContainer.scss'
import Project from "../Project/Project.jsx";

const categories = ["Group Projects", "Study Exercises"]
const projects = [{"id": 1,
                                            "category": "Group Projects",
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe/",
                                                "image": "/projects-%20image.png"},
                                                {"id": 7,
                                                    "category": "Study Exercises",
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe/",
                                                "image": "/projects-%20image.png"},
                                                {"id": 8,
                                                    "category": "Study Exercises",
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe/",
                                                "image": "/projects-%20image.png"},
                                                {"id": 9,
                                                    "category": "Study Exercises",
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe/",
                                                "image": "/projects-%20image.png"},
                                                {"id": 2,
                                                    "category": "Study Exercises",
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe/",
                                                "image": "/projects-%20image.png"},
                                                {"id": 3,
                                                    "category": "Study Exercises",
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe/",
                                                "image": "/projects-%20image.png"},
                                                {"id": 4,
                                                    "category": "Group Projects",
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe/",
                                                "image": "/projects-%20image.png"},
                                                {"id": 5,
                                                    "category": "Study Exercises",
                                                "name": "cookbook",
                                                "link": "/cookbook-recipe/",
                                                "image": "/projects-%20image.png"},
                                                {"id": 6,
                                                    "category": "Gro4p Projects",
                                                "name": "cookbook",
                                                "link": "/https://nomilang.ch/cookbook-recipe/",
                                                "image": "/projects-%20image.png"}]


export default function ProjectsContainer(){
    return <>
        <div className="projects-page">
            <h1>My Projects</h1>
            {categories.map((category)=> <>
                <h2>{category}</h2>
                <div className="projects-container">
        {projects.filter((project)=> project.category===category)
            .map((project)=> (
            <Project key={project.id} project={project}/>
        ))}
            </div></>)}

            </div>
    </>
}