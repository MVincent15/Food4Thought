const createRecipeFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title-add").value.trim();
  const ingredients = document.querySelector("#ingredients-add").value.trim();
  const directions = document.querySelector("#directions-add").value.trim();
  const cookTime = document.querySelector("#cooktime-add").value.trim();
  const comments = document.querySelector("#comments-add").value.trim();
  const image_url = document.querySelector("#image-add").value.trim();

  if (title && ingredients && directions) {
    const response = await fetch("/addrecipe", {
      method: "POST",
      body: JSON.stringify({ title, ingredients, directions, cookTime, comments, image_url }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/recipebook");
    } else {
      alert("Failed to add recipe.");
    }
  }
};

document
  .querySelector("#create-recipe")
  .addEventListener("click", createRecipeFormHandler);
