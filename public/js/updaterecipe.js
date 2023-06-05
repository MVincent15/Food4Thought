const updateRecipeFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title-update").value.trim();
    const ingredients = document.querySelector("#ingredients-update").value.trim();
    const directions = document.querySelector("#directions-update").value.trim();
    const cook_time = document.querySelector("#cooktime-update").value.trim();
    const comments = document.querySelector("#comments-update").value.trim();
    const image_url = document.querySelector("#image-update").value.trim();
    const recipeId = window.location.pathname.split("/")[2];
  
    if (title && ingredients && directions) {
      // need to update fetch route once we establish routes
      const response = await fetch(`/updaterecipe/${recipeId}`, {
        method: "PUT",
        body: JSON.stringify({ title, ingredients, directions, cook_time, comments, image_url }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        // need to update route which this code will navigate to after successfull recipe add once we establish routes
        document.location.replace("/recipebook");
      } else {
        alert("Failed to update recipe.");
      }
    }
  };
  
  document
    .querySelector("#update-recipe")
    .addEventListener("click", updateRecipeFormHandler);
  