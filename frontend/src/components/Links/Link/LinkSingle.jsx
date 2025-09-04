
export default function LinkSingle({link}){

    return <div className='singlink-container'>
        {link.icon && <img src={link.icon} className='icon' alt='icon'/>}
        <a href={link.link} className='singlink' target="_blank">{link.name}</a>
    </div>
}