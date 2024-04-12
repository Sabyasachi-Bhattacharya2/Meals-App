// This is a simple js file created after receiving the params from the scri.js function
// This creates the meal details page


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const mealDetails = urlParams.get('param');
const itemObtained = JSON.parse(mealDetails);


const mainDiv = document.getElementById('main-div');
const cookInsDiv = document.getElementById('cooking-ins');
const firstDiv = document.createElement('h1');
firstDiv.textContent = itemObtained.strMeal;
console.log(mealDetails);
mainDiv.appendChild(firstDiv);

const img = document.createElement('img');
img.src = itemObtained.strMealThumb;
mainDiv.appendChild(img);

const divInstructions = document.createElement('div');
divInstructions.textContent = itemObtained.strInstructions;
cookInsDiv.appendChild(divInstructions);
mainDiv.appendChild(cookInsDiv);