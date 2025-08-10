import SingleRecipe from "../components/Recipes/SingleRecipe/Recipe";
import SingleCookbook from "../components/Cookbooks/SingleCookbook/Cookbook";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function UserPage () {
    const [cookbooks, setBooks] = useState(null)
    const [recipes, setRecipes] = useState(null)

    const [url, setUrl] = useState('https://g2-cookbook.propulsion-learn.ch/backend/api/recipes/?limit=100&offset=0')

    const [nextUrl, setNextUrl] = useState(null)
    const [lastUrl, setLastUrl] = useState(null)
    const {me} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(url)
        .then((response)=>{
            setRecipes(response.data.results.filter((recipe)=>recipe.user.username === me))
            setNextUrl(response.data.next)
            setLastUrl(response.data.previous)
        });
        axios.get('https://g2-cookbook.propulsion-learn.ch/backend/api/cookbooks/?limit=100&offset=0')
        .then((response)=>{
            setBooks(response.data.results.filter((cookbook)=>cookbook.user.username === me))
        })
    }, [url])

    return (
        <div className="paging">
            <div className="recipes-container">
                    <h2 className='main-title'>{me[0].toLocaleUpperCase()+ me.slice(1).toLocaleLowerCase()}'s Recipes</h2>
                    {recipes === null && <div className='loading'>loading recipes...</div>}
                    <div className='buttons'>
                    {lastUrl && <button className='login' onClick={()=>setUrl(lastUrl)}>← Previous</button>}
                    {nextUrl && <button className='login' onClick={()=>setUrl(nextUrl)}>Next →</button>}
                    </div>
                    <button className="login" onClick={()=>navigate("/recipes/create")}>Generate New Recipe</button>
                    {recipes !== null && <><div className='recipe-item'>
                    {recipes.map((recipe) => (
                    <SingleRecipe recipe={recipe} key={recipe.id}/>
                    ))}
                    </div></>}
                    
                </div>
                <div>
            {cookbooks === null && <p>Loading cookbooks...</p>}
            </div>
          {cookbooks !== null && <>
                            <div className="cookbooks-container">
                            <h2 className='main-title'>Cookbooks</h2>
                            <button className="login" onClick={()=>navigate("/cookbooks/create")}>Add New Cookbook</button>
                            <div className='book-item'>
                            {
                            cookbooks.map((book) => (
                            <SingleCookbook book={book} key={book.id}/>
                                    ))
                                }
                                </div>
                                

                                
                            </div>
                        </>}
        </div>
      );
}