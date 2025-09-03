
import {useSelector} from "react-redux";
import {NavLink} from "react-router";
import {useRef, useState} from "react";
import Section from "./Section.jsx";
import {useClickAway} from "react-use";
import {useClickAnywhere} from "../../utils/eventListener.js";

export default function Category({category}){
    const [open, setOpen] = useState(false)
    const wrapperRef = useRef(null)
    const sections = useSelector((s)=> s.sections.items)
            .filter((section) => section.category === category.id)

    useClickAnywhere((e) => {
        if (
          e.target.closest("a") &&
          wrapperRef.current && !wrapperRef.current.contains(e.target)
        ) {
          setOpen(false);
        }
      });


    return <>
            <NavLink ref={wrapperRef} className="subject" onClick={()=>setOpen(!open)} key={`Category: ${category.id}`} to={`/${category.name}`}>{category.name}</NavLink>
            {open && sections.map((section)=> <>
                        <Section section={section}/>
                        </>)}
        </>
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