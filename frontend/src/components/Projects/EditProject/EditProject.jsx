import './editProject.scss'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProject, editProject, postProject} from "../../../slices/projectSlice.js";
import Delete from "../../Delete/Delete.jsx";
import {changeModel, newData} from "../../../utils/aids.js";


export default function EditProject({
                                        close, actionProject, data = {
        section: '', image: null, name: '', image_url: '', projectId: '', view: '', view_code: ''
    }, moveUp = null, moveDown = null
}) {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: data.name,
        image_url: data.image_url,
        image: null,
        view: data.view,
        view_code: data.view_code,
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

                    <div className='input-wrapper2'>
                        <label htmlFor='project-name' className='input-label2'>» Name *</label>
                        <input type='text'
                               placeholder='Project Name'
                               className='input'
                               value={formData.name}
                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                               id='project-name'
                               required
                        />
                    </div>

                    <div className='input-wrapper2'>
                        <label htmlFor='project-url' className='input-label2'>» Project URL</label>
                        <input type='url'
                               placeholder='add a url to view your project'
                               className='input'
                               value={formData.view}
                               onChange={(e) => setFormData({...formData, view: e.target.value})}
                               id='project-url'
                        />
                    </div>

                    <div className='input-wrapper2'>
                        <label htmlFor='project-url2' className='input-label2'>» Code URL</label>
                        <input type='url'
                               placeholder="add a url to view your code"
                               className='input'
                               value={formData.view_code}
                               onChange={(e) => setFormData({...formData, view_code: e.target.value})}
                               id='project-url2'
                        />
                    </div>

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

                    {actionProject === 'edit' &&
                        <div className='move-project'>

                        {moveUp && moveUp[1] &&
                            <button type='button' className='arrow-project'
                                    onClick={moveUp[0]}
                            >← Move Left</button>}

                        {moveDown && moveDown[1] &&
                            <button type='button' className='arrow-project'
                                    onClick={moveDown[0]}
                            >→ Move Right</button>
                        }

                    </div>}

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

            {deleteSession &&
                <Delete modelId={data.projectId}
                        closeSession={() => setDeleteProject(false)} deleteModel={deleteProject}
                modelName={'project'}/>}
        </section>
    </>
}