
export default function LinkSingle({link}){

    return <div className='singlink-container'>
        {link.name.toLowerCase()==='view' && <>
            <img src='/view.png' className='icon' id='view-icon' alt='icon'/>
            <a href={link.link} className='singlink' target="_blank">{link.name}</a>
            </>
        }
        {link.name.toLowerCase()==='view code' && <>
            <img src='/code.png' className='icon' id='code-icon' alt='icon'/>
            <a href={link.link} className='singlink' target="_blank">{link.name}</a>
        </>}
    </div>
}