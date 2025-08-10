
import { Link } from "react-router-dom";
import './recipePage.scss'
import DefaultFood from '../assets/food4.jpg'
import Texture from '../assets/texture2.avif'
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import NotFoundIcon from '../assets/not-found-icon.jpg'

export default function RecipePage() {
    
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recipeNot, setRecipeNot] = useState(false);
    

    useEffect(() => {
        axios.get(`https://g2-cookbook.propulsion-learn.ch/backend/api/recipes/${id}`)
        .then((response)=>{
            setRecipe(response.data)
            setLoading(false);
        })
        .catch((error) => {
        console.log("Error fetching recipe:", error);
        setLoading(false);
        setRecipeNot(true)
        });
    }, [id])


    return <>
        {recipeNot && <div className="not-found"><div className="loading">Recipe Not Found</div>
        <img src={NotFoundIcon} alt="icon" className="not-found-icon"/>
        </div>}
        {loading && <div className="loading">Loading recipe...</div>}
        {!loading && !recipeNot && <>
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="outer-recipe-d">

                <div className="upper-recipe-d" style={{
                            backgroundImage: `url(${recipe.image_url_display || DefaultFood})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            
                        }}>
                    <div className="ingredients">
                        Ingredients:
                        {recipe.recipe_ingredients.map((ing)=>(
                            
                            <div className="ingredient" key={ing.ingredient.id}>
                                <br/>♦  {ing.ingredient.name} - {ing.quantity}
                            </div>
                        ))}
                    </div>

                    <div className="left-upper-recipe">
                            <div className="detailed-details">
                            <div><b>Author:</b> {recipe.user.username || recipe.user.first_name}</div>
                            <div>Created: {new Date(recipe.created).toLocaleDateString()}</div>
                            <div>Updated: {new Date(recipe.updated).toLocaleDateString()}</div>
                            {recipe.cookbooks.length > 0 && <div>
                                <b>Cookbooks: </b>{recipe.cookbooks.map((cookbook)=>(
                                    <span key={cookbook.id}>
                                        <br/>♦ {cookbook.title} </span>
                                ))}
                                </div>}
                            </div>
                            
                    </div>
                </div>

                <div className="lower-recipe-d" style={{
                            backgroundImage: `url(${Texture})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover'
                        }}>
                    <div className="recipe-steps"><b>Steps:</b><br/><br/>{recipe.description}</div>

                    <div className="middle-lower-recipe">
                    {recipe.dietary_categories_output.length > 0 && <div>
                                <b>Category: </b>{recipe.dietary_categories_output.map((category)=>(
                                    <span key={category.id}>
                                        <br/>♦ {category.name} </span>
                                ))}
                                </div>}<br/>
                    {recipe.food_styles_output.length > 0 && <div>
                                <b>Food Style: </b>{recipe.food_styles_output.map((style)=>(
                                    <span key={style.id}>
                                        <br/>♦ {style.name} </span>
                                ))}
                                </div>}
                            </div>


                    <img src={recipe.image_url_display || DefaultFood} className="recipe-images"></img>
                </div>

                <div className="lower-button-recipe">
                <Link to={'/'} className="login">←  Back to recipes</Link>
                </div>
        </div>
            </>}
        </>
}