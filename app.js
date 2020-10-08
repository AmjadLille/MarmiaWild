const form = document.getElementById("formAddRecipe");

let recipe;

if (localStorage.getItem("recipe") === null) {
  recipe = [
    {
      name: "Burger",
      ingredients:
        "Pain, viande hachée, Oignon, Cheddar, Tomate, Salade, Moutarde, Ketchup",
      imgSrc: "./imgs/burger.jpg",
    },
    {
      name: "Spaghetti Bolognaise",
      ingredients:
        "500g de Spaghetti, 1 oignon, 2 gousses d'ail, 1 carrote, 1 branche de céléri, 850g de tomate, boeuf hachée",
      imgSrc: "./imgs/spaghetti-bolognaise.jpeg",
    },
  ];
  createCards(recipe);
} else {
  recipe = JSON.parse(localStorage.getItem("recipe"));
  createCards(recipe);
}

form.onsubmit = (event) => {
  addRecipe(event);
};

// Function for saving the recipe
function saveRecipe(recipe) {
  recipe = JSON.stringify(recipe);
  localStorage.setItem("recipe", recipe);
}
// Function for adding a recipe
function addRecipe(event) {
  event.preventDefault();
  let recipeName = document.getElementById("recipeName").value;
  let recipeIngredients = document.getElementById("recipeIngredients").value;
  let recipeImg = document.getElementById("recipeImg").value;
  let newRecipe = {
    name: recipeName,
    ingredients: recipeIngredients,
    imgSrc: recipeImg,
  };
  recipe.push(newRecipe);
  saveRecipe(recipe);
  location.reload();
  form.reset();
}
// Delete current recipe and save the recipe
function removeRecipe(recipeIndex) {
  recipe = recipe.filter((recipe, index) => index !== recipeIndex);
  saveRecipe(recipe);
  createCards(recipe);
  location.reload();
} // Create Bootstrap cards foreach recipes
function createCards(recipe) {
  const board = document.querySelector(".board");

  recipe.forEach((recipe, index) => {
    let cardResponsive = document.createElement("div");
    cardResponsive.className = "grosseDiv";
    cardResponsive.style.display = "flex";
    cardResponsive.style.justifyContent = "center";
    cardResponsive.style.padding = "10px 10px";
    board.appendChild(cardResponsive);
    let cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.style.borderRadius = "10%";
    cardResponsive.appendChild(cardDiv);
    let cardImg = document.createElement("div");
    cardImg.className = "card-img-top";
    cardImg.style = "width: auto";
    cardImg.style = "height: 50vh";
    cardImg.style.backgroundImage = `url(${recipe.imgSrc})`;
    cardImg.style.backgroundSize = "cover";
    cardImg.style.backgroundRepeat = "no-repeat";
    cardImg.style.backgroundPosition = "center";
    cardImg.style.borderRadius = "10% 10% 0 0";
    cardDiv.appendChild(cardImg);
    let cardH5 = document.createElement("h5");
    cardH5.className = "card-title";
    cardH5.innerHTML = `${recipe.name}`;
    cardH5.style.display = "flex";
    cardH5.style.justifyContent = "center";
    cardDiv.appendChild(cardH5);
    let cardSubDiv = document.createElement("div");
    cardSubDiv.className = "card-body";
    cardSubDiv.style = "display: flex";
    cardSubDiv.style.justifyContent = "center";
    cardSubDiv.style.alignItems = "center";
    cardSubDiv.style = "max-width: 100%";
    cardDiv.appendChild(cardSubDiv);
    let cardP = document.createElement("p");
    cardP.className = "card-text";
    cardP.style = "width: 70%";
    cardP.style.alignSelf = "center";
    cardP.innerHTML = `Ingrédients : ${recipe.ingredients}`;
    cardSubDiv.appendChild(cardP);
    let delButton = document.createElement("button");
    delButton.className = "btn btn-danger";
    delButton.innerText = "Delete";
    delButton.addEventListener("click", () => removeRecipe(index));
    cardSubDiv.appendChild(delButton);
  });
}
