import './addProjectSections.scss'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {editSection, postSection} from "../../../slices/sectionSlice.js";
import {changeModel, newData} from "../../../utils/aids.js";


export default function AddProjectSection({close, sectionAction, data = {name: '', category: null, sectionId: null}}) {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        category: data.category,
        name: data.name,
        sectionId: data.sectionId
    })

    const createError = useSelector((s) => s.sections.createError)
    const updateError = useSelector((s) => s.sections.createError)

    const createSection = changeModel(sectionAction, postSection, editSection)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createSection(newData(formData, ['sectionId']), formData.sectionId))
        close()
    }

    const sectionState = sectionAction === 'add' ? 'Add Section' : 'Save'


    return <>
        <div className='add-section-wrapper'>
            {/*<h4 className='add-psection-title'>Add your section here (Example: 'Group Projects')</h4>*/}
            <form className='add-p-section-input' onSubmit={handleSubmit}>
                <input type='text'
                       placeholder='Section Name'
                       className='section-title'
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       required
                />

                <div className={'edit-section-buttons'}>

                <button type='submit'
                        className='edit-buttons'>{sectionState}</button>

                <button type='reset'
                        className='edit-buttons' id='cancel-section' onClick={close}>Cancel</button>

                <img src='/delete.png' alt='delete' className='edit-icon'/>

                    </div>




            </form>

        </div>
    </>
}