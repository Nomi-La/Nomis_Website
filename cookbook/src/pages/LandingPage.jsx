import Recipes from "../components/Recipes/RecipesContainer/Recipes";
import Cookbooks from "../components/Cookbooks/CookbooksContainer/Cookbooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPublicRecipes } from "../store/slice/recipeSlice";
import { fetchPublicCookbooks } from "../store/slice/cookbookSlice";

export default function LandingPage() {
  const { status: recipesStatus } = useSelector(
    (state) => state.recipes
  );
  const { items: cookbooks, status: cookbooksStatus } = useSelector(
    (state) => state.cookbooks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPublicRecipes());
    dispatch(fetchPublicCookbooks());
  }, [dispatch]);
  

  return (
    <div className="paging">
      <Recipes >
        <div>{recipesStatus === "loading" && <p>Loading recipes...</p>}</div>
        </Recipes>
      <Cookbooks cookbooks={cookbooks}>
        <div>
        {cookbooksStatus === "loading" && <p>Loading cookbooks...</p>}
        </div>
      </Cookbooks>
    </div>
  );
}
