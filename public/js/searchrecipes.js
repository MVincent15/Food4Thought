const searchRecipeFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#search-recipes").value.trim();
  
    if (name) {
      const response = await fetch(`/recipes/search/${name}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        const recipeData = await response.json();
        if (recipeData.length > 0) {
          const id = recipeData[0].id;
          handleRecipeId(id);
        } else {
          alert("Failed to find recipe.");
        }
      } else {
        alert("Failed to find recipe.");
      }
    }
  };
  
  const handleRecipeId = (id) => {
    window.location.href = `/recipe/${id}`;
  };
  
  document
    .querySelector("#search-recipes-btn")
    .addEventListener("click", searchRecipeFormHandler);