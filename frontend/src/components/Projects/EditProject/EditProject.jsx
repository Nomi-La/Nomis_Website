import './editProject.scss'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editProject, postProject} from "../../../slices/projectSlice.js";
import DeleteProject from "../DeleteProject/DeleteProject.jsx";
import {changeModel, newData} from "../../../utils/aids.js";

export default function EditProject({
                                        close, actionProject, data = {
        section: '', image: null, name: '', image_url: '', projectId: ''
    }
                                    }) {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: data.name,
        image_url: data.image_url,
        image: null,
        section: data.section,
        projectId: data.projectId
    })
    const error = useSelector((s) => s.projects.createError)
    const error2 = useSelector((s) => s.projects.editError)
    const projectAction = changeModel(actionProject, postProject, editProject)
    const [deleteSession, setDeleteProject] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(projectAction(newData(formData, ['image_url', 'projectId']), formData.projectId))
        close();
    }


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData({...formData, image: file})
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({...prev, image_url: imageUrl}));
    };
    const actionName = actionProject === 'add' ? 'Add Project' : 'Edit Project';

    return <>
        <section className={`edit-project ${deleteSession ? 'modal-open' : ''}`}>
            <button type='button' className='x' id='x-edit-project'
                    onClick={close}>X
            </button>
            <h2 className='project-edit-title'>{actionName}</h2>
            <form className='project-form' onSubmit={handleSubmit}>
                <div className='main-section'>
                    <div className='input-wrapper'>
                        <label htmlFor='project-name' className='input-label'>Name</label>
                        <input type='text'
                               placeholder='Project Name'
                               className='input'
                               value={formData.name}
                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                               id='project-name'
                               required
                        /></div>

                    <div className='image-upload-wrapper'>

                        {!formData.image_url &&
                            <label htmlFor='project-image' className='edit-buttons'>Upload Image</label>}

                        <div className='image-button-wrapper'>
                            {formData.image_url &&
                                <label htmlFor='project-image' className='edit-buttons'>Replace</label>}
                            {formData.image_url && <button type='button' id='remove-image' onClick={() => setFormData({
                                ...formData,
                                image_url: '',
                                image: null
                            })} className='edit-buttons'>Remove</button>}
                        </div>
                        <input
                            className='Image-Upload'
                            id="project-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {formData.image_url && (
                            <div className='image-frame'>
                                <img
                                    src={formData.image_url}
                                    alt="preview"
                                    className='project-image'
                                /></div>
                        )}
                    </div>

                    {error || error2 && <p className="error-mes">{error || error2}</p>}
                </div>
                <div className='lower-section'>

                    <div className='button-wrapper'>
                        <button type='submit'
                                className='submit-button'>{actionProject === 'edit' && 'Save' || actionName}</button>
                        <button type='reset' onClick={close} className='cancel-button'>Cancel</button>
                    </div>

                    {actionProject === 'edit' &&
                        <button type='button' className='delete-project' id='delete-uniqu'
                                onClick={() => setDeleteProject(true)}>Delete Project</button>}


                </div>
            </form>

            {deleteSession && <DeleteProject projectId={data.projectId} closeSession={() => setDeleteProject(false)}/>}
        </section>
    </>
}