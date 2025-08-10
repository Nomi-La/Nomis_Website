import { configureStore } from "@reduxjs/toolkit";
import testReducer from "./slice/testSlice";
import authReducer from "./slice/authSlice";
import userReducer from "./slice/userSlice";
import recipeReducer from "./slice/recipeSlice";
import coobookReducer from "./slice/cookbookSlice";
import ingredientReducer from "./slice/ingredientSlice";
import foodStyleReducer from "./slice/foodStyleSlice";
import dietaryCategoryReducer from "./slice/dietaryCategorySlice";

const store = configureStore({
  reducer: {
    test: testReducer,
    auth: authReducer,
    users: userReducer,
    recipes: recipeReducer,
    cookbooks: coobookReducer,
    ingredients: ingredientReducer,
    dietaryCategories: dietaryCategoryReducer,
    foodStyles: foodStyleReducer
  },
});

export default store;
