import './linksContainer.scss'
import LinkSingle from "./Link/LinkSingle.jsx";

export default function LinksContainer({links}){


    return <>
        <div className='links-container'>
            {links.map((link) => <LinkSingle link={link}/>)}
        </div>
    </>
}