import './addProjectSections.scss'
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import {editSection, postSection} from "../../../slices/sectionSlice.js";
import {changeModel, newData} from "../../../utils/aids.js";
import useClickAway, {clickSomewhere, useClickAnywhere} from "../../../utils/eventListener.js";


export default function AddProjectSection({close, sectionAction, setDeleteSection,
                                            moveUp = null, moveDown = null,
                                              data = {name: '', category: null, sectionId: null}}) {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        category: data.category,
        name: data.name,
        sectionId: data.sectionId
    })

    const createError = useSelector((s) => s.sections.createError)
    const updateError = useSelector((s) => s.sections.editError)

    const createSection = changeModel(sectionAction, postSection, editSection)

    const createSucceeded = useSelector((s)=>s.sections.createStatus)
    const updateSucceeded = useSelector((s)=>s.sections.editStatus)


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createSection(newData(formData, ['sectionId']), formData.sectionId))
        if ((sectionAction === 'add' && createSucceeded === 'succeeded') ||
            (sectionAction === 'edit' && updateSucceeded === 'succeeded')){
            close()
        }
    }

    const projectSectionRef = useRef(null)
    const clickOut = clickSomewhere(projectSectionRef, [close, ()=>setDeleteSection(false)], 'input')
    useClickAnywhere(clickOut);


    const sectionState = sectionAction === 'add' ? 'Add Section' : 'Save'


    return <>
        <div className='add-section-wrapper' ref={projectSectionRef}>
            <form className='add-p-section-input' onSubmit={handleSubmit}>
                <input type='text'
                       placeholder='Section Name'
                       className='section-title'
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       required
                />

                <div className={'edit-section-buttons'}>

                <div className='direct-wrapper'>

                        {moveUp && moveUp[1] && //↓ ˅ ▼ ▽ ↑ ˄ ▲ △
                            <button className='index-buttons' type='button'
                                              onClick={moveUp[0]}
                        >▲</button>}

                        {moveDown && moveDown[1] &&
                            <button className='index-buttons' type='button'
                                                onClick={moveDown[0]}
                        >▼</button>}

                    </div>

                <div className='two-buttons'>
                <button type='submit'
                        className='edit-buttons'>{sectionState}</button>

                <button type='reset'
                        className='edit-buttons' id='cancel-section' onClick={() => {
                    close()
                    setDeleteSection(null)
                }}>Cancel</button>
                    </div>

                    {sectionAction === 'edit' &&
                        <img src='/delete.png' alt='delete' className='edit-icon' onClick={() => setDeleteSection(formData.sectionId)}/>}

                    </div>

                    {createError && sectionAction === 'add' && <p className='error-mes'>{createError}</p>}
                    {updateError && sectionAction === 'edit' && <p className='error-mes'>{updateError}</p>}


            </form>



        </div>
    </>
}