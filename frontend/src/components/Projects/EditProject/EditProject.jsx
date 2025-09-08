import './editProject.scss'

export default function EditProject({sectionId, close}){

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return <>
        <section className='edit-project'>
            <form onSubmit={handleSubmit}>
                <button type='submit'>Add Project</button>
                <button type='reset' onClick={close}>Cancel</button>
            </form>
        </section>
    </>
}