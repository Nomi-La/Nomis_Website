import './linksContainer.scss'
import LinkSingle from "./Link/LinkSingle.jsx";

export default function LinksContainer({project}) {


    return <>
        <div className='links-container'>
            {project.view && <LinkSingle name={'View'} link={project.view}/>}
            {project.view_code && <LinkSingle name={'View Code'} link={project.view_code}/>}
        </div>
    </>
}