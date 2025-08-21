import './project.scss'
import {useNavigate} from "react-router";

export default function Project({project}){
    const navigate = useNavigate()

    return <div className="project">
        <img src={project.image} alt={project.name}
             onClick={()=>navigate(project.link)}/>
        <h3>{project.name}</h3>
    </div>
}