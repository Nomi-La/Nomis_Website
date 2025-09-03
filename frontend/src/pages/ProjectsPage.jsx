import ProjectsContainer from "../components/Projects/ProjectsContainer/ProjectsContainer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchProjects} from "../slices/projectSlice.js";

export default function ProjectsPage(){
    const sections = useSelector((s)=> s.sections.items)
            .filter((section)=> section.category_name.toLowerCase() === 'projects')
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchProjects())
    }, [])

    return <>
        <div className="projects-page">
            <h1>My Projects</h1>
            {[...(sections ?? [])].sort((a, b) => a.id - b.id)
                .map((section)=> <div key={`sectionD: ${section.id}`}>
                <h2 id={section.id} className='section-title' key='section-title'>{section.name}</h2>
                <ProjectsContainer sectionId={section.id}/>
            </div>)}

            </div>
    </>
}