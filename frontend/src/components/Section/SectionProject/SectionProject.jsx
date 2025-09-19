import './SectionProject.scss'
import {useDispatch} from "react-redux";
import {moveModel} from "../../../utils/aids.js";
import {clearSectionErrors, editSection} from "../../../slices/sectionSlice.js";
import {useRef, useState} from "react";
import {data} from "react-router";
import {clickSomewhere, useClickAnywhere} from "../../../utils/eventListener.js";
import EditSectionTitle from "../EditSectionTitle/EditSectionTitle.jsx";

export default function SectionProject({section, index, sections, user, setDeleteSection, projects}) {
    const [changeSection, setChangeSection] = useState(false)
    const dispatch = useDispatch()

    const moveSection = moveModel(sections, editSection, dispatch)

    const projectSectionRef = useRef(null)
    const clickOut = clickSomewhere(projectSectionRef, [() => setChangeSection(false)], 'input')
    useClickAnywhere(clickOut);

    if (!user && projects.length === 0) return null

    return <>
        <div className='section-wrapper' ref={projectSectionRef}>
            {!changeSection && <h2 id={section.id} className='section-title' key='section-title'>{section.name}</h2>}
            {changeSection && user &&
                <EditSectionTitle sectionAction={'edit'}
                                  data={{...data, name: section.name, sectionId: section.id}}
                                  moveUp={[() => moveSection(index, 0), index > 0]}
                                  moveDown={[() => moveSection(index, sections.length - 1), index < sections.length - 1]}
                                  close={() => {
                                      setChangeSection(false)
                                      dispatch(clearSectionErrors())
                                  }} setDeleteSection={setDeleteSection}
                                  id={'section-title'}
                />}

            {user && !changeSection && <div className='direct-wrapper'>

                <img src='/edit.png' alt='edit' className='edit-icon' onClick={() => (setChangeSection(true))}/>

            </div>}

        </div>
    </>
}