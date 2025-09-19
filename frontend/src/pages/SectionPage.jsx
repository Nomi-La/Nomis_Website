import {useDispatch, useSelector} from "react-redux";
import {sortApiAscending} from "../utils/aids.js";
import Section from "../components/Section/Section/Section.jsx";
import {useEffect, useState} from "react";
import {sideBarState} from "../slices/stateSlice.js";
import EditSectionTitle from "../components/Section/EditSectionTitle/EditSectionTitle.jsx";
import {data} from "react-router";


export default function SectionPage({category, user}) {
    const [addSection, setAddSection] = useState(false)
    const sections = useSelector((s) => s.sections.items)
        .filter((section) => section.category === category.id)
        .sort(sortApiAscending())

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sideBarState('open'))
    }, [])

    return <>
        <div className="sections-page">
            <h1 className={'category-title'}>{category.name}</h1>
            {sections
                .map((section, index) => <div key={`sectionB: ${section.id}`}>
                    <Section section={section} user={user} sections={sections} index={index}/>
                </div>)}
            {user && sections.length && !addSection &&
                <div className={'add-section-button-wrapper'}>
                    <button type='button' id={'add-section-general-button'}
                            onClick={() => setAddSection(true)}
                            className='edit-buttons'>+ Add Section
                    </button>
                </div>}

            {addSection && <EditSectionTitle close={() => setAddSection(false)} sectionAction={'add'}
                                             data={{...data, category: category.id}}
                                             id={'category-section'}
            />}
        </div>
    </>
}