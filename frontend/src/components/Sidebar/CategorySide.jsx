import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router";
import {useRef, useState} from "react";
import SectionSide from "./SectionSide.jsx";
import {useClickAnywhere} from "../../utils/eventListener.js";
import {hasNonLatin, moveModel, sortApiAscending} from "../../utils/aids.js";
import {editCategory} from "../../slices/categorySlice.js";

const slug = (s) => encodeURIComponent(s.toLowerCase().replace(/\s+/g, "-"));

export default function CategorySide({category, categories, index, user}) {
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)
    const sections = useSelector((s) => s.sections.items)
        .filter((section) => section.category === category.id)
        .sort(sortApiAscending())
    const dispatch = useDispatch()
    const moveCategory = moveModel(categories, editCategory, dispatch)

    useClickAnywhere((e) => {
        if (
            e.target.closest("a") &&
            wrapperRef.current && !wrapperRef.current.contains(e.target)
        ) {
            setOpen(false);
        }
    });

    if (!user && !category.sections.length) return null

    return <div ref={wrapperRef} className='category-wrap' key={`1Category-div: ${category.id}`}>
        <div className="category-head">
            <NavLink key={`1Category: ${category.id}`} className="category" onClick={() => setOpen(!open)}
                     to={hasNonLatin(category.name) ? `/sec-${category.id}` : `/${slug(category.name, category.id)}`}>{category.name}</NavLink>

        </div>

        {open && <div className='section-container'>
            {sections.map((section) => <SectionSide section={section} categoryName={category.name.toLowerCase()}
                                                    user={user}/>)}
        </div>}

    </div>
}

