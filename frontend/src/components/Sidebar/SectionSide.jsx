import {useEffect, useState} from "react";
import {useSelector} from "react-redux";


export default function SectionSide({section, categoryName}) {
    const user = useSelector((s) => s.auth.user)
    const projects = useSelector((s) => s.projects.items)
        .filter((project) => project.section === section.id)
    const [hash, setHash] = useState(typeof window !== "undefined" ? window.location.hash : "");

    useEffect(() => {
        const onHashChange = () => setHash(window.location.hash);
        onHashChange();
        window.addEventListener("hashchange", onHashChange);
        return () => window.removeEventListener("hashchange", onHashChange);
    }, []);

    if (!user && projects.length === 0 && categoryName === 'projects') return null

    return <>
                <a href={`#${section.id}`} className={`section-name ${hash === `#${section.id}` ? "activeA" : ""}`}
                   key={`1Section: ${section.id}`}>{section.name}</a>
            </>
}