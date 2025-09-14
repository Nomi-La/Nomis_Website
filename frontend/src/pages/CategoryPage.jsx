import {useDispatch, useSelector} from "react-redux";
import {sortApiAscending} from "../utils/aids.js";
import ProjectsContainer from "../components/Projects/ProjectsContainer/ProjectsContainer.jsx";
import Section from "../components/Section/Section.jsx";
import {useEffect} from "react";
import {sideBarState} from "../slices/stateSlice.js";


export default function CategoryPage({category}){
    const sections = useSelector((s)=> s.sections.items)
            .filter((section) => section.category === category.id)
            .sort(sortApiAscending())

    const dispatch = useDispatch()

    useEffect(()=>{dispatch(sideBarState('open'))}, [])

    return <>
        <div className="projects-page">
            <h1>{category.name}</h1>
            {sections
                .map((section)=> <div key={`sectionB: ${section.id}`}>
                <h2 id={section.id} className='category-section' key={section.name}>{section.name}</h2>
                <Section section={section}/>
            </div>)}

            </div>
    </>
}