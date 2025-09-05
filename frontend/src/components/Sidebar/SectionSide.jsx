import {useEffect, useState} from "react";


export default function SectionSide ({sections}) {
    const [hash, setHash] = useState(typeof window !== "undefined" ? window.location.hash : "");

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

    return <>
        <div className='section-container'>
            {open && sections.map((section)=> <>
                    <a href={`#${section.id}`} className={`section-name ${hash === `#${section.id}` ? "activeA" : ""}`} key={`1Section: ${section.id}`}>{section.name}</a>
            </>)}
                </div>
        </>
}