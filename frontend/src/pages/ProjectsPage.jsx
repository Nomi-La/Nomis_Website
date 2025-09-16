import ProjectsContainer from "../components/Projects/ProjectsContainer/ProjectsContainer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchProjects} from "../slices/projectSlice.js";
import {moveModel, sortApiAscending} from "../utils/aids.js";
import {sideBarState} from "../slices/stateSlice.js";
import AddProjectSection from "../components/Section/AddProjectSection.jsx";
import {editSection} from "../slices/sectionSlice.js";

export default function ProjectsPage({index}){
    const user = useSelector((s)=>s.auth.user)
    const sections = useSelector((s)=> s.sections.items)
            .filter((section)=> section.category === index)
        .sort(sortApiAscending())

    const dispatch = useDispatch()
    const [addSection, setAddSection] = useState(false)
    const moveSection = moveModel(sections, editSection, dispatch)

    useEffect(()=>{
        dispatch(fetchProjects())
        dispatch(sideBarState('open'))
    }, [])

    return <>
        <div className="projects-page">
            <h1>My Projects</h1>

            {sections.map((section, index)=> <div key={`sectionD: ${section.id}`}>

                <div className='section-wrapper'>
                    <h2 id={section.id} className='section-title' key='section-title'>{section.name}</h2>

                    <div className='direct-wrapper'>
                    {user && <>
                        {index > 0 &&
                            //↓ ˅ ▼ ▽ ↑ ˄ ▲ △
                            <button className='index-buttons' type='button' onClick={() => moveSection(index, 0)}>↑</button>}
                        {index < sections.length-1 &&
                            <button className='index-buttons' type='button' onClick={() => moveSection(index, sections.length-1)}>↓</button>}
                    </>} </div>

                    </div>

                <ProjectsContainer sectionId={section.id}/>

            </div>)}

            {user && !sections.length &&
                <><button type='button' onClick={()=>setAddSection(true)}>Start adding your project sections</button>
                    <p>group projects section, solo projects section, etc</p></>}

            {user && sections.length && !addSection &&
            <button type='button' onClick={()=>setAddSection(true)}>Add a Section</button>}

            {addSection && <AddProjectSection projectsIndex={index} close={()=>setAddSection(false)}/>}
            </div>
    </>
}