import {useRef, useState} from "react";
import useClickAway from "../../../utils/eventListener.js";


export default function LinkSingle({name, link}) {

    const linkType = name.toLowerCase() === 'view'? 'View': 'View Code';
    const [openLink, setOpenLink] = useState(false)

    const linkRef = useRef(null)
    useClickAway(linkRef,() => setOpenLink(false))

    return <div className='singlink-container' ref={linkRef}>
        <img src={linkType=== 'View'? '/view.png': '/code.png'}
                 className='icon' id={linkType === 'View'? 'view-icon': 'code-icon'} alt='icon'/>
        <button className='singlink' onClick={() => setOpenLink(!openLink)}>{linkType}</button>
        {openLink && <a href={link} target='_blank' className='project-link'>{link}</a>}

    </div>
}