import ProjectsContainer from "../components/Projects/ProjectsContainer/ProjectsContainer.jsx";
import {useDispatch, useSelector} from "react-redux";
import Project from "../components/Projects/Project/Project.jsx";
import {useEffect} from "react";
import {fetchSections} from "../slices/sectionSlice.js";

export default function ProjectsPage(){
    const sections = useSelector((s)=> s.sections.items)
            .filter((section)=> section.category_name.toLowerCase() === 'projects')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchSections())
    }, [])

    return <>
        <div className="projects-page">
            <h1>My Projects</h1>
            {sections.map((section)=> <div key={`sectionD: ${section.id}`}>
                <h2>{section.name}</h2>
                <ProjectsContainer sectionId={section.id}/>
            </div>)}

            </div>
    </>
}