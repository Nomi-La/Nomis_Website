import './projectSection.scss'
import {useDispatch, useSelector} from "react-redux";
import {moveModel, sortApiAscending} from "../../../utils/aids.js";
import {editSection} from "../../../slices/sectionSlice.js";
import {useState} from "react";
import AddProjectSection from "../AddProjectSection/AddProjectSection.jsx";
import {data} from "react-router";

export default function ProjectSection({section, index, sections}) {
    const [changeSection, setChangeSection] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((s) => s.auth.user)
    const projects = useSelector((s) => s.projects.items)
        .filter((project) => project.section === section.id)
        .sort(sortApiAscending())

    const moveSection = moveModel(sections, editSection, dispatch)

    if (!user && projects.length === 0) return null

    return <>
        <div className='section-wrapper'>
            {!changeSection && <h2 id={section.id} className='section-title' key='section-title'>{section.name}</h2>}
            {changeSection &&
                <AddProjectSection sectionAction={'edit'} data={{...data, name: section.name, sectionId: section.id}}
                                   close={() => setChangeSection(false)}/>}

            {user && !changeSection && <div className='direct-wrapper'>


                {index > 0 &&
                    //↓ ˅ ▼ ▽ ↑ ˄ ▲ △
                    <button className='index-buttons' type='button'
                            onClick={() => moveSection(index, 0)}>↑</button>}
                {index < sections.length - 1 &&
                    <button className='index-buttons' type='button'
                            onClick={() => moveSection(index, sections.length - 1)}>↓</button>}


                <img src='/edit.png' alt='edit' className='edit-icon' onClick={() => (setChangeSection(true))}/>

            </div>}

        </div>
    </>
}