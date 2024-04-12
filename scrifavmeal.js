

// This creates card grid function and helps in creating the favorite-meal html file
// This takes its input from the local storage which is created from the scri.js file

let listOfFavorites = [];
function mealCardCreation() {
    const mainDiv = document.getElementById('fav-meals');
    let tempList = localStorage.getItem('myArray');
    if(tempList) {
        listOfFavorites = JSON.parse(tempList);
    }
    console.log(listOfFavorites);
    listOfFavorites.forEach(elem => {
        const divBox = document.createElement('div');
        divBox.classList.add('card-grid-item');
        const btnRmvFromFav = document.createElement('button');
        const divMealName = document.createElement('div');
        const divIngredients = document.createElement('div')
        const videoTutorial = document.createElement('a'); 
        const imgOfMeal = document.createElement('img');
        divMealName.textContent = elem.strMeal;
        imgOfMeal.src = elem.strMealThumb;
        if(divMealName.textContent.toLowerCase().includes('chicken') || divMealName.textContent.toLowerCase().includes('beef') || divMealName.textContent.toLowerCase().includes('lamb')|| divMealName.textContent.toLowerCase().includes('pork')) {
            imgOfMeal.classList.add('thumbnail-non-veg');
        }
        else {
            imgOfMeal.classList.add('thumbnail-veg');
        }

        videoTutorial.href = elem.strYoutube;
        videoTutorial.textContent = 'Video Tutorial';
        videoTutorial.target='_blank';
        btnRmvFromFav.textContent = 'Remove';

        // removal of item is done here using the remove button
        btnRmvFromFav.addEventListener('click', () => {
            const index = listOfFavorites.indexOf(elem);
            listOfFavorites.splice(index, 1);
            localStorage.setItem('myArray', JSON.stringify(listOfFavorites));
            divBox.remove();
        });
        divBox.appendChild(imgOfMeal);
        divBox.appendChild(divMealName);
        divBox.appendChild(videoTutorial);
        divBox.appendChild(divIngredients);
        divBox.appendChild(btnRmvFromFav);
        mainDiv.appendChild(divBox);
    });
}

mealCardCreation();


