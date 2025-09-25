import './addCategory.scss'
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeModel, newData} from "../../../utils/aids.js";
import {clearCategoryErrors, editCategory, postCategory} from "../../../slices/categorySlice.js";

export default function AddCategory({close, data = {name: '', categoryId: null}}, action = 'add') {

    const [formData, setFormData] = useState({
        name: data.name,
        categoryId: data.categoryId
    })
    const dispatch = useDispatch()

    const error = useSelector((s) => s.categories.createError)
    const successCreate = useSelector((s) => s.categories.createStatus)
    const successEdit = useSelector((s) => s.categories.createStatus)
    const categoryAction = changeModel(action, postCategory, editCategory)

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(categoryAction(newData(formData), formData.categoryId));

    }
    if (successCreate === 'succeeded') {
        dispatch(clearCategoryErrors())
        close()
    }

    return <section className={'edit-category'}>

        <form className={'adit-category-wrap'} onSubmit={handleSubmit}>
            {/*<button type='button' className='x'*/}
            {/*                onClick={close}>X*/}
            {/*        </button>*/}
            <div className='delete-rec'>

                <div className='top-delete'>
                    <p>Add Category</p>

                </div>

                <div className='delete-main-wrap'>
                    <div className='input-wrapper2'>
                        <label htmlFor='category-name' className='input-label2'>» Name</label>
                        <input type='text'
                               placeholder='Category Name'
                               className='input'
                               value={formData.name}
                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                               id='category-name'
                               required
                        />
                    </div>


                </div>

                {error && <p className="error-mes">{error}</p>}

                <div className='bottom-delete'>
                    <button type='submit' className='delete-project'
                    >Add
                    </button>
                    <button type='button' className='delete-project'
                            id='cancel' onClick={close}>Cancel
                    </button>
                </div>

            </div>
        </form>
    </section>
}