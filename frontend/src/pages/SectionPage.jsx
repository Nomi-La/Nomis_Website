import {useDispatch, useSelector} from "react-redux";
import {sortApiAscending} from "../utils/aids.js";
import Section from "../components/Section/Section/Section.jsx";
import {useEffect, useState} from "react";
import {sideBarState} from "../slices/stateSlice.js";
import EditSection from "../components/Section/EditSection/EditSection.jsx";
import {data} from "react-router";
import './sectionPage.scss'
import {fetchSections} from "../slices/sectionSlice.js";


export default function SectionPage({category, user}) {
    const [addSection, setAddSection] = useState(false)
    const sections = useSelector((s) => s.sections.items)
        .filter((section) => section.category === category.id)
        .sort(sortApiAscending())
    const [sectionsLength, setSectionLength] = useState(sections.length)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sideBarState('open'))
    }, [])


    return <>
        <div className="sections-page">
            <h1 className={'category-title'}>{category.name}</h1>

            {(!sections.length) && !addSection &&
                <div className='section-wrapper' id={'first-section'}>

                <button type={'button'} className='category-section' onClick={()=> setAddSection(true)}>Start Adding Your Sections here</button>
            </div>}

            {sections
                .map((section, index) => <div key={`sectionB: ${section.id}`}>

                    <Section section={section} user={user} sections={sections} index={index}/>
                </div>)}
            {user && (sections.length > 0) && !addSection &&
                <div className={'add-section-button-wrapper'} id={'add-section-wrap-id'}>
                    <button type='button' id={'add-section-general-button'}
                            onClick={() => setAddSection(true)}
                            className='edit-buttons'>+ Add Section
                    </button>
                </div>}

            {addSection && <EditSection close={() => {
                setAddSection(false)
                // if (sectionsLength === 0) window.location.reload()
            }} sectionAction={'add'}
                                        data={{...data, category: category.id}}
                                        id={'category-section'}
            />}
        </div>
    </>
}