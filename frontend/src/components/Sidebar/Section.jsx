

export default function Section ({section}) {
    return <>
            <a href={`#${section.id}`} className='section-name' key={`1Section: ${section.id}`}>{section.name}</a>
    </>
}