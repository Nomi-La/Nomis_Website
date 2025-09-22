import './editSection.scss'
import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import {clearSectionErrors, deleteSection, editSection, postSection} from "../../../slices/sectionSlice.js";
import {autoGrow, changeModel, imageUpload, newData} from "../../../utils/aids.js";
import {clickSomewhere, useClickAnywhere} from "../../../utils/eventListener.js";
import Delete from "../../Delete/Delete.jsx";


export default function EditSection({
                                             close, sectionAction, setDeleteSection,
                                             moveUp = null, moveDown = null, id = '',
                                             data = {name: '', category: null, sectionId: null,
                                                 image: null, image2: null, content: ''
                                             }
                                         }) {

    const dispatch = useDispatch()
    const [deleteTheSection, setTheDeleteSection] = useState(false)

    const [formData, setFormData] = useState({
        category: data.category,
        name: data.name,
        sectionId: data.sectionId,
        image: data.image,
        image_url: data.image,
        image2: data.image2,
        image2_url: data.image2,
        content: data.content,
    })

    const createError = useSelector((s) => s.sections.createError)
    const updateError = useSelector((s) => s.sections.editError)

    const createSection = changeModel(sectionAction, postSection, editSection)

    const createSucceeded = useSelector((s) => s.sections.createStatus)
    const updateSucceeded = useSelector((s) => s.sections.editStatus)


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createSection(newData(formData, ['sectionId', 'image_url', 'image2_url',]), formData.sectionId))
    }

    const projectSectionRef = useRef(null)
    const clickOut = clickSomewhere(projectSectionRef, [close, () => setDeleteSection(false)], 'textarea')
    useClickAnywhere(clickOut);


    const sectionState = sectionAction === 'add' ? 'Add Section' : 'Save'

    const handleImageUpload = imageUpload(setFormData, formData)

    const noImages = !formData.image_url && !formData.image2_url

    if ((sectionAction === 'add' && createSucceeded === 'succeeded') ||
            (sectionAction === 'edit' && updateSucceeded === 'succeeded')) {
            clearSectionErrors()
            close()
        }

    return <section ref={projectSectionRef}>

        <div className='add-section-wrapper'>

            <form className='add-p-section-input' onSubmit={handleSubmit} id={id}>

                <div className='add-section-main'>
                <textarea placeholder='Section Name'
                          rows={1}
                          className={id}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          onClick={autoGrow}
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
                            }}>Cancel
                            </button>

                        </div>

                        {sectionAction === 'edit' &&
                            <img src='/delete.png' alt='delete' className='edit-icon'
                                 onClick={() => setDeleteSection? setDeleteSection(formData.sectionId): setTheDeleteSection(true)}/>}

                    </div>

                </div>
                {createError && sectionAction === 'add' && <p className='error-mes'>{createError}</p>}
                {updateError && sectionAction === 'edit' && <p className='error-mes'>{updateError}</p>}
                {id === 'category-section' &&
                    <div className='section-wrap'>

                    <div className='content-wrap'>
                        <textarea className='section-content'
                                  rows={7}
                                  placeholder={'Section content'}
                                  value={formData.content}
                                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                                  onClick={autoGrow}
                        />
                    </div>

                    <div className='image-wrap'>

                        <div className='image-upload-wrapper'>

                            {formData.image_url && (
                                <div className='frame-image'>
                                    <img
                                        src={formData.image_url}
                                        alt="preview"
                                        className='section-image'
                                    /></div>
                            )}

                            {!formData.image_url &&

                                <label htmlFor='section-image' className='empty'>+ upload image</label>
                            }

                            <div className='image-button-wrapper'>
                                {formData.image_url &&
                                    <label htmlFor='section-image' className='edit-buttons'>Replace</label>}
                                {formData.image_url &&
                                    <button type='button' id='remove-image' onClick={() => setFormData({
                                        ...formData,
                                        image_url: '',
                                        image: null
                                    })} className='edit-buttons'>Remove</button>}
                            </div>
                            <input
                                className='Image-Upload'
                                id="section-image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                        </div>

                        {!noImages && <div className='image-upload-wrapper'>

                            {formData.image2_url && (
                                <div className='frame-image'>
                                    <img
                                        src={formData.image2_url}
                                        alt="preview"
                                        className='section-image'
                                    /></div>
                            )}

                            {!formData.image2_url && !noImages &&
                                <label htmlFor='section-image2'
                                       className='empty'>+ add an image</label>}

                            <div className='image-button-wrapper'>
                                {formData.image2_url &&
                                    <label htmlFor='section-image2' className='edit-buttons'>Replace</label>}
                                {formData.image2_url &&
                                    <button type='button' id='remove-image' onClick={() => setFormData({
                                        ...formData,
                                        image2_url: '',
                                        image2: null
                                    })} className='edit-buttons'>Remove</button>}
                            </div>
                            <input
                                className='Image-Upload'
                                id="section-image2"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'image2')}
                            />

                        </div>}

                    </div>

                        {deleteTheSection && <Delete modelId={formData.sectionId} deleteModel={deleteSection} modelName={'section'} noProjects={true}
                                                  closeSession={()=>setTheDeleteSection(false)}/>}

                </div>}

            </form>


        </div>
    </section>
}