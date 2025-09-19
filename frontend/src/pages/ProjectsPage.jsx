import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchProjects} from "../slices/projectSlice.js";
import {sortApiAscending} from "../utils/aids.js";
import {sideBarState} from "../slices/stateSlice.js";
import {data} from "react-router";
import EditSectionTitle from "../components/Section/EditSectionTitle/EditSectionTitle.jsx";
import ProjectSection from '../components/Projects/ProjectSection/ProjectSection.jsx'

export default function ProjectsPage({categoryId, user}) {
    const sections = useSelector((s) => s.sections.items)
        .filter((section) => section.category === categoryId)
        .sort(sortApiAscending())

    const dispatch = useDispatch()
    const [addSection, setAddSection] = useState(false)


    useEffect(() => {
        dispatch(fetchProjects())
        dispatch(sideBarState('open'))
    }, [])

    return <>
        <div className="projects-page">
            <h1 className='category-title'>My Projects</h1>

            {sections.map((section, index) => <>
                <div key={`sectionD: ${section.id}`}>
                    <ProjectSection section={section} sections={sections} user={user} index={index}/>

                </div>
            </>)}

            {user && !sections.length &&
                <>
                    <button type='button' onClick={() => setAddSection(true)}>Start adding your project sections
                    </button>
                    <p>group projects section, solo projects section, etc</p></>}

            {user && sections.length && !addSection &&
                <div className={'add-section-button-wrapper'}>
                    <button type='button' id={'add-section-general-button'}
                            onClick={() => setAddSection(true)}
                            className='edit-buttons'>+ Add Section
                    </button>
                </div>}

            {addSection && <EditSectionTitle close={() => setAddSection(false)} sectionAction={'add'}
                                             data={{...data, category: categoryId}} id={'section-title'}/>}
        </div>
    </>
}