import './editProject.scss'
import {useState} from "react";

export default function EditProject({sectionId, close}){

    const [formData, setFormData] = useState({
        name: '',
        image_url: '',
    })
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, image_url: imageUrl }));
      };


    return <>
        <section className='edit-project'>
            <h2 className='project-edit-title'>Add Project</h2>
            <form className='project-form' onSubmit={handleSubmit}>

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

                <div className='input-wrapper'>
                    <label htmlFor='project-image' className='input-label'>Image</label>
                    <input
                        className='Image-Upload'
                      id="project-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                </div>

                {formData.image_url && (
          <img
            src={formData.image_url}
            alt="preview"
            className='project-image-preview'
          />
        )}




                <div className='button-wrapper'>
                <button type='submit' className='submit-button'>Add Project</button>
                <button type='reset' onClick={close} className='cancel-button'>Cancel</button></div>
            </form>
        </section>
    </>
}