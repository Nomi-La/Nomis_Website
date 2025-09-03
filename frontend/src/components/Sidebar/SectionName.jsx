import {useEffect, useState} from "react";
import {filterSections} from "../../utils/requests.js";
import parseError from "../../utils/parseError.js";
import {useSelector} from "react-redux";


export default function SectionName({categoryId}){
    const sections = useSelector((s)=> s.sections.items)
            .filter((section))


    return <>
        {sections.map((section)=><>
        <label className='section-name' key={`Section: ${section.id}`}>{section.name}</label>
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