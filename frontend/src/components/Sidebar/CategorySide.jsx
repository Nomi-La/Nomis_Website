
import {useSelector} from "react-redux";
import {NavLink} from "react-router";
import {useRef, useState} from "react";
import SectionSide from "./SectionSide.jsx";
import {useClickAnywhere} from "../../utils/eventListener.js";
import {sortApiAscending} from "../../utils/aids.js";

const slug = (s) => encodeURIComponent(s.toLowerCase().replace(/\s+/g, "-"));

export default function CategorySide({category}){
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)
    const sections = useSelector((s)=> s.sections.items)
            .filter((section) => section.category === category.id)
            .sort(sortApiAscending())

    useClickAnywhere((e) => {
        if (
          e.target.closest("a") &&
          wrapperRef.current && !wrapperRef.current.contains(e.target)
        ) {
          setOpen(false);
        }
      });


    return <div ref={wrapperRef} className='category-wrap' key={`1Category-div: ${category.id}`}>
            <NavLink key={`1Category: ${category.id}`} className="category" onClick={()=>setOpen(!open)} to={`/${slug(category.name)}`}>{category.name}</NavLink>
        {open && <SectionSide sections={sections}/>}
        </div>
}

// const [sections, setSections] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [err, setErr] = useState(null);
//
//     useEffect(()=>{
//
//         if (!categoryId) return;
//         setLoading(true);
//         setErr(null);
//
//         filterSections({category: categoryId})
//             .then(setSections)
//             .catch((e) => setErr(parseError(e)))
//             .finally(() => setLoading(false))
//
//
//     }, [categoryId])