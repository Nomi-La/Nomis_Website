import "./recipe.scss";
import DefaultFood from '../../../assets/food13.jpg'
import { useNavigate } from "react-router-dom";

export default function SingleRecipe({ recipe }) {
  const navigate = useNavigate()
  return (
      <>
      
        <div className="recipe" key={recipe.id}>
          <div className="upper-recipe" onClick={() => navigate(`/recipe/${recipe.id}`)}>
            <img className="recipe-photo" src={recipe.image_url_display || DefaultFood} alt="photo"/>
            <h4>{recipe.title}</h4>
          </div>
          <p><i>{recipe.description}</i></p>
        </div>
      
      </>
  );
}
