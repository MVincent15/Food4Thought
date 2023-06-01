const deleteRecipe = async (event) => {
  event.preventDefault();

  const recipeId = window.location.pathname.split("/")[3];

  console.log(recipeId);

  const response = await fetch(`/dashboard/deleterecipe/${recipeId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete recipe.");
  }
};

document
  .querySelector("#delete-recipe-btn")
  .addEventListener("click", deleteRecipe);
