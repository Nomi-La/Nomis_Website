import './editSection.scss'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {autoGrow, changeModel, imageUpload, newData} from "../../../utils/aids.js";
import {editSection, postSection} from "../../../slices/sectionSlice.js";
import EditSectionTitle from "../EditSectionTitle/EditSectionTitle.jsx";

export default function EditSection({close, data={ content: '',
                                                image: null, name: '',
                                                image2: null,
                                                sectionId: null}}) {

    const [formData, setFormData] = useState({
        content: data.content,
        image: null,
        image_url: data.image,
        image2: null,
        image2_url: data.image2,
        sectionId: data.sectionId,
        name: data.name
    })
    const dispatch = useDispatch()
    const error = useSelector((s) => s.sections.createError)
    const error2 = useSelector((s) => s.sections.editError)
    const sectionAct = changeModel('edit', postSection, editSection)

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(sectionAct(newData(formData, ['image_url', 'image2_url', 'sectionId', 'name']), formData.sectionId))
        close();
    }

    const handleImageUpload = imageUpload(setFormData, formData)

    return <section className='edit-section'>
        <EditSectionTitle sectionAction={'edit'}
                                  data={{...data, name: section.name, sectionId: section.id}}
                                  moveUp={[() => moveSection(index, 0), index > 0]}
                                  moveDown={[() => moveSection(index, sections.length - 1), index < sections.length - 1]}
                                  close={() => {
                                      setChangeSection(false)
                                      dispatch(clearSectionErrors())
                                  }}
                                  setDeleteSection={(value) => setDeleteSection(value)}
                                  id={'category-section'}
                />

        <form className={'section-form'} onSubmit={handleSubmit}>
        <div className='section-wrap'>

            <div className='content-wrap'>
                <textarea className='section-content'
                          placeholder={'Add section content here'}
                          value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          onClick={autoGrow}
                          required
                />
            </div>

                <div className='image-wrap'>
                    {formData.image_url &&
                        <div className='frame-image'><img className='section-image' src={formData.image_url} alt='preview'/>
                        </div>}
                    {formData.image2_url && <div className='frame-image'>
                        <img className='section-image' src={formData.image2_url} alt='preview'/></div>}
                </div>


        </div>
            </form>
    </section>
}