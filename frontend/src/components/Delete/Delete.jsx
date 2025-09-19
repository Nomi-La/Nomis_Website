import './delete.scss'
import {useDispatch} from "react-redux";

export default function Delete({closeSession, modelId, deleteModel, modelName, noProjects = false}) {

    const dispatch = useDispatch()

    return <>
        <div className='are-you-sure'>
            <div className='delete-rec'>

                <div className='top-delete'>
                    <p>{modelName} deletion</p>
                    <button type='button' className='x'
                            onClick={closeSession}>X
                    </button>
                </div>

                <div className='delete-main-wrap'>
                    <p className='delete-text'>Are you sure you want to delete this {modelName}?</p>

                    {modelName === 'section' && !noProjects && <><span>Beware!</span>
                        <p className='delete-text' id='beware'>All projects related to this section will be deleted as
                            well.</p></>}
                </div>

                <div className='bottom-delete'>
                    <button type='button' className='delete-project'
                            onClick={() => dispatch(deleteModel(modelId))}>Delete
                    </button>
                    <button type='button' className='delete-project'
                            id='cancel' onClick={closeSession}>Cancel
                    </button>
                </div>

            </div>

        </div>
    </>
}