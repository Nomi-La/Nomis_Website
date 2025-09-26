import {useDispatch, useSelector} from "react-redux";
import {moveModel, sortApiAscending} from "../utils/aids.js";
import Section from "../components/Section/Section/Section.jsx";
import {useEffect, useRef, useState} from "react";
import {sideBarState} from "../slices/stateSlice.js";
import EditSection from "../components/Section/EditSection/EditSection.jsx";
import {data} from "react-router";
import './sectionPage.scss'
import {clearSectionErrors} from "../slices/sectionSlice.js";
import EditCategory from "../components/Category/EditCategory/EditCategory.jsx";
import {clearCategoryErrors, deleteCategory, editCategory} from "../slices/categorySlice.js";
import useClickAway from "../utils/eventListener.js";
import Delete from "../components/Delete/Delete.jsx";


export default function SectionPage({category, user, categories, index}) {
    const [addSection, setAddSection] = useState(false)
    const sections = useSelector((s) => s.sections.items)
        .filter((section) => section.category === category.id)
        .sort(sortApiAscending())
    const dispatch = useDispatch()
    const [deleteTheCategory, setDeleteCategory] = useState(null)
    const [editMode, setEditMode] = useState(null)
    const [editTheCategory, setEditCategory] = useState(null)
    const moveCategory = moveModel(categories, editCategory, dispatch)
    const categoryRef = useRef(null)

    useClickAway(categoryRef, () => {
        setEditCategory(false)
        setEditMode(false)
    })

    useEffect(() => {
        dispatch(sideBarState('open'))
    }, [])

    if (!user && (!sections.length)) return <p style={{margin: '3rem 0', width: '100%', textAlign: 'center'}}>Login to
        edit your page</p>

    return <>
        <div className={`sections-page ${deleteTheCategory ? 'open' : ''}`}>
            <div className={'top-category'} ref={categoryRef}>
                {!editTheCategory && <>
                    <h1 className={'category-title'}>{category.name}</h1>

                    {user && !editMode && <div className='direct-wrapper' id={'category'}>

                        {category.name.toLowerCase() !== 'about me' &&
                            <img src='/edit.png' alt='edit' className='edit-icon' onClick={() => {
                                (setEditCategory(true))
                                setAddSection(false)
                                setEditMode(true)
                            }}/>}

                    </div>}
                </>}
                {editTheCategory && <EditCategory close={() => {
                    setEditCategory(false)
                    dispatch(clearCategoryErrors())
                    setEditMode(false)
                }} openDeleteCategory={() => setDeleteCategory(category.id)}
                                                  moveUp={[() => moveCategory(index, 0), index > 1]}
                                                  moveDown={[() => moveCategory(index, categories.length - 1), index < categories.length - 1]}
                                                  data={{...data, name: category.name, categoryId: category.id}}/>}
            </div>

            <div className={'lower-sections'} style={{'position': 'relative'}}>

                {deleteTheCategory === category.id && <Delete modelId={category.id} closeSession={() => {
                    setDeleteCategory(null)
                    dispatch(clearCategoryErrors())
                }}
                                                              deleteModel={deleteCategory} modelName={'category'}
                                                              noProjects={!(category.sections.length)}/>}

                {(!sections.length) && !addSection && <>
                    <div className='section-wrapper' id={'first-section'}>

                        <button type={'button'} className='category-section' onClick={() => setAddSection(true)}>Start
                            Adding Your Sections here
                        </button>
                        <img className={'flower'} src='/flower6.png' alt={'flower'}/>
                    </div>

                </>}

                {sections
                    .map((section, index) => <div key={`sectionB: ${section.id}`}>

                        <Section section={section} user={user} sections={sections}
                                 setEditMode={setEditMode} index={index} editMode={editMode}/>
                    </div>)}
                {user && (sections.length > 0) && !addSection && !editMode &&
                    <div className={'add-section-button-wrapper'} id={'add-section-wrap-id'}>
                        <button type='button' id={'add-section-general-button'}
                                onClick={() => {
                                    setAddSection(true)
                                    setEditMode(true)
                                }}
                                className='edit-buttons'>+ Add Section
                        </button>
                    </div>}

                {addSection && <EditSection close={() => {
                    setAddSection(false)
                    dispatch(clearSectionErrors())
                    setEditMode(false)
                }} sectionAction={'add'}
                                            data={{...data, category: category.id}}
                                            id={'category-section'}
                />}
            </div>
        </div>
    </>
}