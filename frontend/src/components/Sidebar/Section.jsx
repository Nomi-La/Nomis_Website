

export default function Section ({section}) {
    return <>
            <label className='section-name' key={`Section: ${section.id}`}>{section.name}</label>
    </>
}