import './deleteProject.scss'
import {deleteProject} from "../../../slices/projectSlice.js";
import {useDispatch} from "react-redux";

export default function DeleteProject({closeSession, projectId}) {

    const dispatch = useDispatch()

    return <>
        <div className='are-you-sure'>
            <div className='delete-rec'>

                <div className='top-delete'>
                    <p>project deletion</p>
                    <button type='button' className='x'
                            onClick={closeSession}>X
                    </button>
                </div>

                <p className='delete-text'>Are you sure you want to delete this project?</p>

                <div className='bottom-delete'>
                    <button type='button' className='delete-project'
                            onClick={() => dispatch(deleteProject(projectId))}>Delete
                    </button>
                    <button type='button' className='delete-project'
                            id='cancel' onClick={closeSession}>Cancel
                    </button>
                </div>

            </div>

        </div>
    </>
}