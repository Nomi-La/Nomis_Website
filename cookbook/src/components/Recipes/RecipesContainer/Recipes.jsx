import './recipes1.scss'
import SingleRecipe from '../SingleRecipe/Recipe'
import axios from 'axios';
import { useState, useEffect } from "react";

export default function Recipes () {
    const [recipes, setRecipes] = useState(null);
    const [url, setUrl] = useState('https://g2-cookbook.propulsion-learn.ch/backend/api/recipes/')
    const [nextUrl, setNextUrl] = useState(null)
    const [lastUrl, setLastUrl] = useState(null)

    useEffect(()=>{
        axios.get(url)
        .then((response)=>{
            setRecipes(response.data.results)
            setNextUrl(response.data.next)
            setLastUrl(response.data.previous)
        })
    }, [url])
    

    return <div className="recipes-container">
        <h2 className='main-title'>Public Recipes</h2>
        {recipes === null && <div className='loading'>loading recipes...</div>}
        <div className='buttons'>
        {lastUrl && <button className='login' onClick={()=>setUrl(lastUrl)}>← Previous</button>}
        {nextUrl && <button className='login' onClick={()=>setUrl(nextUrl)}>Next →</button>}
        </div>
        {recipes !== null && <><div className='recipe-item'>
        {recipes.map((recipe) => (
        <SingleRecipe recipe={recipe} key={recipe.id}/>
        ))}
        </div></>}
    </div>
}
