import './projectSection.scss'
import SectionProject from "../../Section/SectionProject/SectionProject.jsx";
import ProjectsContainer from "../ProjectsContainer/ProjectsContainer.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";
import {sortApiAscending} from "../../../utils/aids.js";

export default function ProjectSection({section, sections, user, index}) {
    const [deleteSection, setDeleteSection] = useState(null)
    const projects = useSelector((s) => s.projects.items)
        .filter((project) => project.section === section.id)
        .sort(sortApiAscending())

    return <>
        <SectionProject section={section}
                        index={index}
                        sections={sections}
                        user={user} projects={projects}
                        setDeleteSection={(value) => setDeleteSection(value)}/>

        <ProjectsContainer sectionId={section.id} user={user} deleteSectionSession={deleteSection}
                           setDeleteSection={() => setDeleteSection(null)} projects={projects}/>
    </>
}