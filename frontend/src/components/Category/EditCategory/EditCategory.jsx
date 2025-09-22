import './editCategory.scss'
import {useDispatch, useSelector} from "react-redux";
import {clearCategoryErrors, editCategory, postCategory} from "../../../slices/categorySlice.js";
import {autoGrow, changeModel, newData, slug} from "../../../utils/aids.js";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function EditCategory({close, moveUp, moveDown, openDeleteCategory, data = {
    name: '',
    categoryId: null,
}}){
    const [formData, setFormData] = useState({
        name: data.name,
        categoryId: data.categoryId
    })
    const dispatch = useDispatch()
    const sendCategory = changeModel('edit', postCategory, editCategory)
    const error = useSelector((s)=>s.categories.editError)
    const succeeded = useSelector((s)=>s.categories.editStatus)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(sendCategory(newData(formData), formData.categoryId))
        navigate(`/${slug(formData.name)}`)
    }
    const navigate = useNavigate()
    if (succeeded === 'succeeded'){
        dispatch(clearCategoryErrors())
        navigate(`/${slug(formData.name)}`)
        close()
    }
    return <section className={'edit-real-category'}>
        <form className={'edit-category-form'} onSubmit={handleSubmit}>
            <div className='add-section-main'>
                <textarea placeholder='Category Name'
                          rows={1}
                          className={'category-title'}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          onClick={autoGrow}
                          required
                />

                    <div className={'edit-section-buttons'}>

                        <div className='direct-wrapper'>

                            {moveUp && moveUp[1] && //↓ ˅ ▼ ▽ ↑ ˄ ▲ △
                                <button className='index-buttons' type='button'
                                        onClick={moveUp[0]}
                                >▲</button>}

                            {moveDown && moveDown[1] &&
                                <button className='index-buttons' type='button'
                                        onClick={moveDown[0]}
                                >▼</button>}

                        </div>

                        <div className='two-buttons'>

                            <button type='submit'
                                    className='edit-buttons'>Save</button>

                            <button type='reset'
                                    className='edit-buttons' id='cancel-section' onClick={() => {
                                close()
                            }}>Cancel
                            </button>

                        </div>

                        <img src='/delete.png' alt='delete' className='edit-icon'
                                 onClick={openDeleteCategory}/>

                    </div>

                </div>
        </form>
    </section>
}