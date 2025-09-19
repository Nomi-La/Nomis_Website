import './section.scss'
import {useState} from "react";
import EditSectionTitle from "../EditSectionTitle/EditSectionTitle.jsx";
import {data} from "react-router";
import {clearSectionErrors, editSection} from "../../../slices/sectionSlice.js";
import {useDispatch} from "react-redux";
import {moveModel} from "../../../utils/aids.js";
import EditSection from "../EditSection/EditSection.jsx";

export default function Section({section, user, sections, index}) {
    const [deleteSection, setDeleteSection] = useState(null)
    const hasImage = !!(section.image || section.image2);
    const [changeSection, setChangeSection] = useState(false)
    const dispatch = useDispatch()

    const moveSection = moveModel(sections, editSection, dispatch)

    return <>

        <div className='section-wrapper'>{/*upper section*/}

            {!changeSection && <h2 id={section.id} className='category-section' key={section.name}>{section.name}</h2>}

            {user && !changeSection && <div className='direct-wrapper'>

                <img src='/edit.png' alt='edit' className='edit-icon' id={'edit-icon-section'}
                     onClick={() => (setChangeSection(true))}/>

            </div>}

        </div>

        {!changeSection && <div className='section-wrap'>

            <div className='content-wrap'>
                <p className='section-content'>{section.content}</p>
            </div>

            {hasImage &&

                <div className='image-wrap'>
                    {section.image &&
                        <div className='frame-image'><img className='section-image' src={section.image} alt='image'/>
                        </div>}
                    {section.image2 && <div className='frame-image'>
                        <img className='section-image' src={section.image2} alt='image'/></div>}
                </div>

            }
        </div>}

        {changeSection && <EditSection close={()=>setChangeSection(false)}
                                       data={{...data, content: section.content, image: section.image, image2: section.image2, sectionId: section.id}}/>}
    </>
}