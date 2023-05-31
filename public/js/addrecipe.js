const blogPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#add-recipe-title").value.trim();
  const ingredients = document
    .querySelector("#add-recipe-ingredients")
    .value.trim();
  const directions = document
    .querySelector("#add-recipe-directions")
    .value.trim();

  if (title && ingredients && directions) {
    // need to update fetch route once we establish routes
    const response = await fetch("/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // need to update route which this code will navigate to after successfull recipe add once we establish routes
      document.location.replace("/");
    } else {
      alert("Failed to add blogpost.");
    }
  }
};

document
  .querySelector("#add-blogpost")
  .addEventListener("click", blogPostFormHandler);
