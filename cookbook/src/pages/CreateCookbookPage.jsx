import api from "../axios/api";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createCookbook,
  fetchPublicCookbooks,
} from "../store/slice/cookbookSlice";

const CreateCookbookPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  });

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [createStatus, setCreateStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image_url: imageUrl }));
  };

  const generateImageWithAI = async () => {
    const prompt = `Cover image for a cookbook titled "${
      formData.title || "a cookbook"
    }"`;
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

  const handleSubmit = async () => {
    if (!validateCreateCookbookForm()) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url,
    };

    setCreateStatus("loading");
    setErrorMessage("");

    try {
      console.log("PAYLOAD to submit:", payload);
      const result = await dispatch(createCookbook(payload)).unwrap();
      console.log("Created successfully:", result);

      setFormData({
        title: "",
        description: "",
        image_url: "",
      });
      setCreateStatus("success");
      dispatch(fetchPublicCookbooks());
    } catch (err) {
      console.error(err);
      setCreateStatus("error");
      setErrorMessage(err?.detail || "Something went wrong");
    }
  };

  const validateCreateCookbookForm = () => {
    return formData.title.trim() !== "" && formData.description.trim() !== "";
  };

  return (
    <section className="create-cookbook-page">
      <h2>Create a New Cookbook</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <label>Description:</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* UPLOAD IMAGE */}
        <label htmlFor="imageUpload">Upload an image:</label>
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

        {/* GENERATE IMAGE */}
        {isGeneratingImage && (
          <>
            <div className="spinner"></div>
            <span>Generating image...</span>
          </>
        )}
        <button type="button" onClick={generateImageWithAI}>
          Generate Image with AI
        </button>

        <button type="submit" disabled={createStatus === "loading"}>
          {createStatus === "loading" ? "Saving..." : "Save Cookbook"}
        </button>

        {createStatus === "error" && (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}
      </form>
    </section>
  );
};

export default CreateCookbookPage;
