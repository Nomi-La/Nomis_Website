import './linksContainer.scss'
import {useSelector} from "react-redux";
import LinkSingle from "./Link/LinkSingle.jsx";

export default function LinksContainer({projectId}){
    const links = useSelector((s)=>s.links.items)
                 .filter((link)=> link.project_id===projectId)
                 .sort((a, b) => a.id - b.id)

    return <>
        {links && <div className='links-container'>
            {links.map((link) => <LinkSingle link={link}/>)}
        </div>}
    </>
}