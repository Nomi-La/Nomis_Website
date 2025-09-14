
export default function LinkSingle({name, link}){

    return <div className='singlink-container'>
        {name.toLowerCase() ==='view' && <>
            <img src='/view.png' className='icon' id='view-icon' alt='icon'/>
            <a href={link} className='singlink' target="_blank">{name}</a>
            </>
        }
        {name.toLowerCase() ==='view code' && <>
            <img src='/code.png' className='icon' id='code-icon' alt='icon'/>
            <a href={link} className='singlink' target="_blank">{name}</a>
        </>}
    </div>
}