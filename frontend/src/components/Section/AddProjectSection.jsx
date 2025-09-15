import './addProjectSections.scss'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {postSection} from "../../slices/sectionSlice.js";
import {newData} from "../../utils/aids.js";



export default function AddProjectSection({projectsIndex, close, data = {name: ''}}) {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        category: projectsIndex,
        name: data.name
    })

    const createError = useSelector((s) => s.sections.createError)
    const updateError = useSelector((s) => s.sections.createError)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postSection(newData(formData)))
        close()
    }




    return <>
        <div className='add-section-wrapper'>
            {/*<h4 className='add-psection-title'>Add your section here (Example: 'Group Projects')</h4>*/}
                <form className='add-psection-input' onSubmit={handleSubmit}>
                <input type='text'
                placeholder='Section Name'
                className='section-title'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                    />
                <button type='submit'
                    className='edit-buttons' id='add-project'>Add Section</button>
                </form>

            </div>
    </>
}