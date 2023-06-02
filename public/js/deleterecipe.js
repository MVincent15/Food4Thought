const deleteRecipe = async (event) => {
  event.preventDefault();

  const recipeId = window.location.pathname.split("/")[2];

  console.log(recipeId);

  const response = await fetch(`/deleterecipe/${recipeId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/recipebook");
  } else {
    alert("Failed to delete recipe.");
  }
};

document
  .querySelector("#delete-recipe-btn")
  .addEventListener("click", deleteRecipe);
