import {useSelector} from "react-redux";


export default function SectionName({category}){

    const sections = useSelector((s) => s.sections.items)



    return <>
        {sections.map((section)=><>
        <label className='section-name' key={`Section: ${section.id}`}>{section.name}</label>
        </>)}
    </>
}