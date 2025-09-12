import './editProject.scss'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteProject, editProject, postProject} from "../../../slices/projectSlice.js";

function changeProject (action){
    if (action === 'Add Project') {
        return (data, id) => postProject(data)
    }
    return (data, id)=> editProject({modelData: data, id})
}

export default function EditProject({close, actionProject, data = {
    section: '', image: null, name: '', image_url: '', projectId: ''}}){

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: data.name,
        image_url: data.image_url,
        image: null,
        section: data.section,
        projectId: data.projectId
    })
    const error = useSelector((s) => s.projects.createError)
    const error2 = useSelector((s)=> s.projects.editError)
    const projectAction = changeProject(actionProject)
    const [deleteSession, setDeleteProject] = useState(false)

    const handleSubmit = (e) => {

        const newProject = new FormData();

       newProject.append('name', formData.name);
       newProject.append('section', formData.section);
          if (formData.image) newProject.append('image', formData.image);


        e.preventDefault()
        dispatch(projectAction(newProject, formData.projectId))

    }


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData({...formData, image: file})
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, image_url: imageUrl }));
      };


    return <>
        <section className='edit-project'>
            <h2 className='project-edit-title'>{actionProject}</h2>
            <form className='project-form' onSubmit={handleSubmit}>
                <div className='main-section'>
                <div className='input-wrapper'>
                <label htmlFor='project-name' className='input-label'>Name</label>
                <input type='text'
                placeholder='Project Name'
                className='input'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                id='project-name'
                required
                    /></div>

                <div className='image-upload-wrapper'>

                    {!formData.image_url && <label htmlFor='project-image' className='edit-buttons'>Upload Image</label>}

                    <div className='image-button-wrapper'>
                    {formData.image_url && <label htmlFor='project-image' className='edit-buttons'>Replace</label>}
                    {formData.image_url && <button type='button' id='remove-image' onClick={()=>setFormData({...formData, image_url: '', image: null})} className='edit-buttons'>Remove</button>}
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
                <button type='submit' className='submit-button'>{actionProject === 'Edit Project' && 'Save' || actionProject}</button>
                <button type='reset' onClick={close} className='cancel-button'>Cancel</button>
                </div>

                    {actionProject === 'Edit Project' &&
                <button type='button' className='delete-project' id='delete-uniqu' onClick={()=>setDeleteProject(true)}>Delete Project</button> }

                {deleteSession && <div className='are-you-sure'>
                    <div className='delete-rec'>

                        <div className='top-delete'>
                            <p>project deletion</p>
                            <button type='button' className='delete-project'
                                    id='x' onClick={()=>setDeleteProject(false)}>X</button>
                        </div>

                        <p className='delete-text'>Are you sure you want to delete this project?</p>

                        <div className='bottom-delete'>
                            <button type='button' className='delete-project' onClick={()=>dispatch(deleteProject(data.projectId))}>Delete</button>
                            <button type='button' className='delete-project'
                                    id='cancel' onClick={()=>setDeleteProject(false)}>Cancel</button>
                        </div>

                        </div>

                    </div> }

                </div>
            </form>
        </section>
    </>
}