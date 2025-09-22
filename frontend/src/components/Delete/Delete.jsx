import './delete.scss'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useRef} from "react";
import {useClickAnywhere} from "../../utils/eventListener.js";

export default function Delete({closeSession, modelId, deleteModel, modelName, noProjects = false}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categoryError = useSelector((s)=>s.categories.deleteError)
    const categorySuccess = useSelector((s)=>s.categories.deleteStatus)
    const deleteRef = useRef(null)

    useClickAnywhere(deleteRef, closeSession, 'a')

    if (modelName === 'category' && categorySuccess==='succeeded') navigate('/')

    return <>
        <div className='are-you-sure' ref={deleteRef}>
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
                {modelName === 'category' && !noProjects && <><span>Beware!</span>
                        <p className='delete-text' id='beware'>All sections related to this category will be deleted as
                            well.</p></>}
                </div>

                {categoryError && <p className={'error-mes'}>{categoryError}</p>}

                <div className='bottom-delete'>
                    <button type='button' className='delete-project'
                            onClick={() => {
                                dispatch(deleteModel(modelId))

                            }}>Delete
                    </button>
                    <button type='button' className='delete-project'
                            id='cancel' onClick={closeSession}>Cancel
                    </button>
                </div>

            </div>

        </div>
    </>
}