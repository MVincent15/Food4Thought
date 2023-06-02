const createRecipeFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-add").value.trim();
  const ingredients = document.querySelector("#ingredients-add").value.trim();
  const directions = document.querySelector("#directions-add").value.trim();
  const cookTime = document.querySelector("#cooktime-add").value.trim();
  const comments = document.querySelector("#comments-add").value.trim();

  if (title && ingredients && directions) {
    // need to update fetch route once we establish routes
    const response = await fetch("/addrecipe", {
      method: "POST",
      body: JSON.stringify({ title, ingredients, directions, cookTime, comments }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // need to update route which this code will navigate to after successfull recipe add once we establish routes
      document.location.replace("/recipebook");
    } else {
      alert("Failed to add recipe.");
    }
  }
};

document
  .querySelector("#create-recipe")
  .addEventListener("click", createRecipeFormHandler);
