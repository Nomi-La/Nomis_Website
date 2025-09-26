import './section.scss'
import {useState} from "react";
import {data} from "react-router";
import {clearSectionErrors, editSection} from "../../../slices/sectionSlice.js";
import {useDispatch} from "react-redux";
import {moveModel} from "../../../utils/aids.js";
import EditSection from "../EditSection/EditSection.jsx";

export default function Section({section, user, sections, index, setEditMode, editMode}) {

    const hasImage = !!(section.image || section.image2);
    const [changeSection, setChangeSection] = useState(false)
    const dispatch = useDispatch()

    const moveSection = moveModel(sections, editSection, dispatch)

    if (!user && !section.content && !section.image && !section.image2) return null

    return <>

        {!changeSection && <div className={'whole-section'}>

            <div className='section-wrapper'>{/*upper section*/}

                {!changeSection &&
                    <h2 id={section.id} className='category-section' key={section.name}>{section.name}</h2>}
                {user && !changeSection && !editMode && <div className='direct-wrapper'>

                    <img src='/edit.png' alt='edit' className='edit-icon' id={'edit-icon-section'}
                         onClick={() => {
                             setEditMode(true)
                             setChangeSection(true)
                         }}/>

                </div>}
            </div>


            <div className='section-wrap'>
                {!section.content && user && !section.image && !section.image2 &&
                    <div className='no-projects'>
                        <button type='button' onClick={() => setChangeSection(true)}
                                className={'empty'}>Add Section content here
                        </button>
                    </div>}

                <div className='content-wrap'>
                    <p className='section-content'>{section.content}</p>
                </div>

                {hasImage &&

                    <div className='image-wrap'>
                        {section.image &&
                            <div className='frame-image'><img className='section-image' src={section.image}
                                                              alt='image'/>
                            </div>}
                        {section.image2 && <div className='frame-image'>
                            <img className='section-image' src={section.image2} alt='image'/></div>}
                    </div>

                }

                {user && !editMode && <button type={"button"} className={'edit-buttons'} id={'edit'}
                                 onClick={()=> {
                                     setChangeSection(true)
                                     setEditMode(true)
                                 }}>Edit</button> }
            </div>
        </div>}

        {changeSection && <EditSection close={() => {
            setChangeSection(false)
            dispatch(clearSectionErrors())
            setEditMode(false)
        }} id={'category-section'} sectionAction={'edit'}
                                       moveUp={[() => moveSection(index, 0), index > 0]}
                                       moveDown={[() => moveSection(index, sections.length - 1), index < sections.length - 1]}
                                       data={{
                                           ...data,
                                           category: section.category,
                                           name: section.name,
                                           content: section.content,
                                           image: section.image,
                                           image2: section.image2,
                                           sectionId: section.id,
                                       }}
        />}


    </>
}