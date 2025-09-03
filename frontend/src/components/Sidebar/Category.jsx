
import {useSelector} from "react-redux";
import {NavLink} from "react-router";
import {useRef, useState} from "react";
import Section from "./Section.jsx";
import {useClickAnywhere} from "../../utils/eventListener.js";

export default function Category({category}){
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)
    const sections = useSelector((s)=> s.sections.items)
            .filter((section) => section.category === category.id)
            .sort((a, b) => a.id - b.id)

    useClickAnywhere((e) => {
        if (
          e.target.closest("a") &&
          wrapperRef.current && !wrapperRef.current.contains(e.target)
        ) {
          setOpen(false);
        }
      });


    return <div ref={wrapperRef} className='category-wrap' key={`1Category-div: ${category.id}`}>
            <NavLink key={`1Category: ${category.id}`} className="category" onClick={()=>setOpen(!open)} to={`/${category.name}`}>{category.name}</NavLink>
            {open && sections.map((section)=> <>
                        <Section section={section}/>
                        </>)}
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