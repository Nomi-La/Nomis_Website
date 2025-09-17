import './projectsPage.scss'
import ProjectsContainer from "../components/Projects/ProjectsContainer/ProjectsContainer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchProjects} from "../slices/projectSlice.js";
import {sortApiAscending} from "../utils/aids.js";
import {sideBarState} from "../slices/stateSlice.js";
import AddProjectSection from "../components/Section/AddProjectSection/AddProjectSection.jsx";
import ProjectSection from "../components/Section/ProjectSection/ProjectSection.jsx";
import {data} from "react-router";

export default function ProjectsPage({categoryId}) {
    const user = useSelector((s) => s.auth.user)
    const sections = useSelector((s) => s.sections.items)
        .filter((section) => section.category === categoryId)
        .sort(sortApiAscending())

    const dispatch = useDispatch()
    const [addSection, setAddSection] = useState(false)
    const [deleteSection, setDeleteSection] = useState(null)


    useEffect(() => {
        dispatch(fetchProjects())
        dispatch(sideBarState('open'))
    }, [])

    return <>
        <div className="projects-page">
            <h1>My Projects</h1>

            {sections.map((section, index) => <>
                <div key={`sectionD: ${section.id}`}>

                    <ProjectSection section={section} index={index} sections={sections} user={user} setDeleteSection={(value)=>setDeleteSection(value)}/>

                    <ProjectsContainer sectionId={section.id} user={user} deleteSectionSession={deleteSection}
                    setDeleteSection={()=>setDeleteSection(null)}/>

                </div>
            </>)}

            {user && !sections.length &&
                <>
                    <button type='button' onClick={() => setAddSection(true)}>Start adding your project sections
                    </button>
                    <p>group projects section, solo projects section, etc</p></>}

            {user && sections.length && !addSection &&
                <button type='button' onClick={() => setAddSection(true)} className='add-p-section'>Add a Section</button>}

            {addSection && <AddProjectSection close={() => setAddSection(false)} sectionAction={'add'}
                                              data={{...data, category: categoryId}}/>}
        </div>
    </>
}