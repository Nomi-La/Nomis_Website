import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchIngredients } from "../store/slice/ingredientSlice";
import { fetchDietaryCategories } from "../store/slice/dietaryCategorySlice";
import { fetchFoodStyles } from "../store/slice/foodStyleSlice";
import { fetchPublicRecipes } from "../store/slice/recipeSlice";
import { fetchPublicCookbooks } from "../store/slice/cookbookSlice";
import { createIngredient } from "../store/slice/ingredientSlice";
import { createRecipe } from "../store/slice/recipeSlice";
import api from "../axios/api";

export default function CreateRecipePage() {
  const token = localStorage.getItem("access-token");
  //const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNjE3NTU0LCJpYXQiOjE3NTIxODU1NTQsImp0aSI6IjYxOWNiZjFmNzRhNTQzMmVhNjdlZThiNGM3NGI1Y2RmIiwidXNlcl9pZCI6NX0.xpLOgdlS30Bty3GyqEHx-HsmCuxJlPlH9r2H4MI7_64";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchFoodStyles());
    dispatch(fetchDietaryCategories());
    dispatch(fetchPublicCookbooks()); // se ne hai uno
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    selectedCookbooks: [],
    selectedFoodStyles: [],
    selectedDietaryCategories: [],
    ingredientsToUse: [],
    image_url: "",
  });

  const [ingredientSearch, setIngredientSearch] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");

  const [createStatus, setCreateStatus] = useState("idle"); // 'idle' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingRecipe, setIsGeneratingRecipe] = useState(false);

  const [aiPrompt, setAiPrompt] = useState("");

  const allIngredients = useSelector((state) => state.ingredients.list || []);
  const foodStyles = useSelector((state) => state.foodStyles?.list || []);
  const dietaryCategories = useSelector(
    (state) => state.dietaryCategories?.list || []
  );
  const cookbooks = useSelector((state) => state.cookbooks.items || []);

  const filteredIngredients = allIngredients.filter((ing) =>
    ing.name.toLowerCase().includes(ingredientSearch.toLowerCase())
  );

  const addIngredientToRecipe = (ingredient) => {
    if (!ingredient || !ingredientQuantity) return;

    const exists = formData.ingredientsToUse.find(
      (i) => i.id === ingredient.id
    );
    if (exists) return;

    setFormData((prev) => ({
      ...prev,
      ingredientsToUse: [
        ...prev.ingredientsToUse,
        {
          id: ingredient.id,
          name: ingredient.name,
          quantity: ingredientQuantity,
        },
      ],
    }));

    setIngredientSearch("");
    setIngredientQuantity("");
  };

  const handleCreateIngredient = async (name) => {
    if (!name) return;

    const result = await dispatch(createIngredient({ name }));
    if (createIngredient.fulfilled.match(result)) {
      const newIngredient = result.payload;
      addIngredientToRecipe(newIngredient);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image_url: imageUrl }));
  };

  const generateImageWithAI = async () => {
    const prompt = `Image of a recipe called ${formData.title || "a dish"}`;
    setIsGeneratingImage(true);

    try {
      const response = await api.post("ai/generate-image/", { prompt });

      const data = response.data;

      setFormData((prev) => ({
        ...prev,
        image_url: data.image_uri,
      }));
    } catch (error) {
      console.error("Image generation failed:", error);
      setErrorMessage("Image generation failed");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSave = async () => {
    if (!validateRecipeForm()) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      dietary_categories: formData.selectedDietaryCategories.map((val) => {
        const cat = dietaryCategories.find((c) => c.id === val);
        return cat
          ? cat.id
          : { name: val.name || val, description: val.description || "" };
      }),
      food_styles: formData.selectedFoodStyles.map((val) => {
        const style = foodStyles.find((s) => s.id === val);
        return style
          ? style.id
          : { name: val.name || val, description: val.description || "" };
      }),
      cookbooks: formData.selectedCookbooks.map((id) => {
        return id;
        /*const cookbook = cookbooks.find((cb) => cb.id === id);
        return {
          title: cookbook.title,
          description: cookbook.description || "",
          // user: cookbook.user
        };*/
      }),
      recipe_ingredients: formData.ingredientsToUse.map((ing) => ({
        ingredient: ing.id ? ing.id : { name: ing.name },
        quantity: ing.quantity,
      })),
      image_url: formData.image_url,
    };

    setCreateStatus("loading");
    setErrorMessage("");

    try {
      console.log("PAYLOAD to submit:", payload);
      const result = await dispatch(createRecipe(payload)).unwrap();
      setCreateStatus("success");
      setFormData({
        title: "",
        description: "",
        difficulty: "",
        selectedCookbooks: [],
        selectedFoodStyles: [],
        selectedDietaryCategories: [],
        ingredientsToUse: [],
        image_url: "",
      });
      dispatch(fetchPublicRecipes());
    } catch (err) {
      console.error(err);
      setCreateStatus("error");
      setErrorMessage(err?.detail || "Something went wrong");
    }
  };

  const generateRecipeWithAI = async () => {
    const prompt = aiPrompt.trim() || "a dish";

    try {
      setIsGeneratingRecipe(true);
      const response = await api.post(
        "ai/generate-recipe/",
        {
          user_prompt: prompt,
          ingredients: formData.ingredientsToUse.map((ing) => ing.name),
          food_styles: formData.selectedFoodStyles.map((id) => {
            const style = foodStyles.find((fs) => fs.id === id);
            return style?.name;
          }),
          dietary_categories: formData.selectedDietaryCategories.map((id) => {
            const cat = dietaryCategories.find((dc) => dc.id === id);
            return cat?.name;
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log(data);

      // Ricostruiamo recipe_ingredients
      const ingredientsToUse = data.recipe_ingredients.map((item, index) => ({
        name: item.ingredient.name,
        quantity: item.quantity,
      }));

      // Ricostruiamo dietary/food category ID da name
      const dietaryCategoryObjects = data.dietary_categories.map((dc) => ({
        name: dc.name,
        description: dc.description || "",
      }));

      const foodStyleObjects = data.food_styles.map((fs) => ({
        name: fs.name,
        description: fs.description || "",
      }));

      setFormData((prev) => ({
        ...prev,
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        ingredientsToUse,
        selectedDietaryCategories: dietaryCategoryObjects,
        selectedFoodStyles: foodStyleObjects,
      }));
      setIsGeneratingRecipe(false);
    } catch (err) {
      console.error("AI Recipe generation failed:", err);
      setErrorMessage("AI Recipe generation failed");
    }
  };

  const validateRecipeForm = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.difficulty !== "" &&
      formData.ingredientsToUse.length > 0
    );
  };

  return (
    <div className="create-recipe-page">
      <h1 id="main-title">Create a New Recipe</h1>
      <div className="form-grid">
        {/* TITLE */}
        <section className="form-section">
          <label htmlFor="title"> Recipe Name</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </section>

        <section className="form-section">
          <label htmlFor="description">Describe the step of your recipe</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </section>

        {/* DIFFICULTY */}
        <section className="form-section">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={formData.difficulty}
            onChange={(e) =>
              setFormData({ ...formData, difficulty: e.target.value })
            }
          >
            <option value="">-- Select difficulty --</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </section>

        {/* COOKBOOKS */}
        <section className="form-section">
          <label htmlFor="cookbooks">Select Cookbooks:</label>
          <select
            id="cookbooks"
            multiple
            value={formData.selectedCookbooks}
            onChange={(e) => {
              const options = [...e.target.selectedOptions].map((opt) =>
                Number(opt.value)
              );
              setFormData({ ...formData, selectedCookbooks: options });
            }}
          >
            {cookbooks.map((cb) => (
              <option key={cb.id} value={cb.id}>
                {cb.title}
              </option>
            ))}
          </select>
        </section>

        {/* FOOD STYLES */}
        <section className="form-section">
          <label htmlFor="foodstyles">Food styles:</label>
          <select
            id="foodstyles"
            multiple
            value={formData.selectedFoodStyles}
            onChange={(e) => {
              const options = [...e.target.selectedOptions].map((opt) =>
                Number(opt.value)
              );
              setFormData({ ...formData, selectedFoodStyles: options });
            }}
          >
            {foodStyles.map((style) => (
              <option key={style.id} value={style.id}>
                {style.name}
              </option>
            ))}
          </select>
        </section>

        {/* DIETARY CATEGORIES */}
        <section className="form-section">
          <label htmlFor="dietary">Dietary categories:</label>
          <select
            id="dietary"
            multiple
            value={formData.selectedDietaryCategories}
            onChange={(e) => {
              const options = [...e.target.selectedOptions].map((opt) =>
                Number(opt.value)
              );
              setFormData({ ...formData, selectedDietaryCategories: options });
            }}
          >
            {dietaryCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </section>

        {/* INGREDIENTS */}
        <section className="form-section ingredients">
          <label>Ingredients:</label>
          <input
            type="text"
            placeholder="Search or add ingredient"
            value={ingredientSearch}
            onChange={(e) => setIngredientSearch(e.target.value)}
          />

          <div className="ingredient-results">
            {filteredIngredients.length > 0 ? (
              filteredIngredients.map((ing) => (
                <div key={ing.id} className="ingredient-item">
                  <span>{ing.name}</span>
                  <button onClick={() => addIngredientToRecipe(ing)}>
                    Add
                  </button>
                </div>
              ))
            ) : (
              <div className="no-match">
                <p>No match found.</p>
                <button
                  onClick={() => handleCreateIngredient(ingredientSearch)}
                >
                  Create ingredient "{ingredientSearch}"
                </button>
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Quantity (e.g. 200 g)"
            value={ingredientQuantity}
            onChange={(e) => setIngredientQuantity(e.target.value)}
          />

          <div className="selected-ingredients">
            <h4>Selected ingredients:</h4>
            <ul>
              {formData.ingredientsToUse.map((ing) => (
                <li key={ing.id}>
                  {ing.name} – {ing.quantity}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* UPLOAD IMAGE */}
        <section className="form-section upload-image">
          <label htmlFor="imageUpload">
            Upload an image or{" "}
            {isGeneratingImage && (
              <>
                <div className="spinner"></div>
                <span>Generating image...</span>
              </>
            )}
            <button type="button" onClick={generateImageWithAI}>
              Generate Image with AI
            </button>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="preview"
              style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }}
            />
          )}
        </section>

        {/* GENERATE RECIPE */}
        <section className="form-section ai-text">
          <label>Generate recipe with AI:</label>
          <textarea
            placeholder="Description..."
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
          ></textarea>
          {isGeneratingRecipe && (
            <>
              <div className="spinner"></div>
              <span>Generating recipe...</span>
            </>
          )}
          <button type="button" onClick={generateRecipeWithAI}>
            Generate Recipe with AI
          </button>
        </section>
      </div>
      <section className="save-wrapper">
        <button
          disabled={!validateRecipeForm() || createStatus === "loading"}
          onClick={handleSave}
          className="save-button"
        >
          {createStatus === "loading" ? "Saving..." : "SAVE"}
        </button>

        {createStatus === "success" && (
          <p className="success-message">Recipe successfully created!</p>
        )}
        {createStatus === "error" && (
          <p className="error-message">Error: {errorMessage}</p>
        )}
      </section>
    </div>
  );
}
