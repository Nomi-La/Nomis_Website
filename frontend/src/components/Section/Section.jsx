import './section.scss'

export default function Section({section}){
    const hasImage = !!(section.image || section.image2);

    return <>
        <div className='section-wrap'>
            <div className='content-wrap'>
                <p className='section-content'>{section.content}</p>
            </div>

            {hasImage &&

                <div className='image-wrap'>
                    {section.image && <div className='frame-image'> <img className='section-image' src={section.image} alt='image'/> </div>}
            {section.image2 && <div className='frame-image'>
                <img className='section-image' src={section.image2} alt='image'/></div> }
                </div>

            }
        </div>
    </>
}