let searchJson; //This is the variable on which the search of input bar is done 
export let listOfFavorites = []; // This array keeps the list of element added to favorites

console.log(listOfFavorites);

// Initial function to be loaded in the browser
document.addEventListener('DOMContentLoaded', () => {
    const inputSearch = document.getElementById('searchMeal');
    
            //search is performed on the change inside the input bar
            inputSearch.addEventListener('input', async ()=> {
                // starts the search as the length of search string exceeds 1
                if(inputSearch.value.length >= 2) {
                    await searchBar(inputSearch.value);
                } else {
                    inputDropdown.innerHTML = '';
                }

            });
});

// aync function performs the search on the 'str' received from prev function
// moreover calls the createDropdown function based on the filtered search results
async function searchBar(str) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${str.charAt(0)}`);
    searchJson = await res.json();
    console.log(searchJson);   
    if(searchJson) {
        const meals = searchJson.meals;
        const filterMatch = meals.filter(meal => meal.strMeal.toLowerCase().includes(str));
        createDropdown(filterMatch);
        console.log(filterMatch);
    } 
}

// function creating the dropdown 
const inputDropdown = document.getElementById("input-dropdown");
export function createDropdown(filterMatch) {
    inputDropdown.innerHTML = '';
    const templist = localStorage.getItem('myArray');
    if(templist) {
        console.log(`listOfFavorites ${listOfFavorites}`);
        listOfFavorites = JSON.parse(templist);
    }
    if(filterMatch) {
        filterMatch.forEach(element => {
            const createOption = document.createElement("div");
            createOption.textContent = element.strMeal;
            const addFavButton = document.createElement("button");
            addFavButton.textContent = "Add to Favorites";
            addFavButton.classList.add('btn-success');
            if(createOption.textContent.toLowerCase().includes('chicken') || createOption.textContent.toLowerCase().includes('beef') || createOption.textContent.toLowerCase().includes('lamb')|| createOption.textContent.toLowerCase().includes('pork')) {
                createOption.classList.add('input-dropdown-non-veg');
            } else {
                createOption.classList.add('input-dropdown-veg');
            }

            // Adding to favorite button is created with stop the event propagation 
            // to its parent div
            
            let idToFind = element.idMeal;
            let index = listOfFavorites.findIndex(meal => meal.idMeal == idToFind);
            console.log(index);
            console.log(element);
            console.log(listOfFavorites);
            addFavButton.addEventListener('click',(event) => {
                event.stopPropagation();
                
                if(index == -1) {
                    const updatedList = [...listOfFavorites, element];
                    updateListOfFavorites(updatedList);
                    localStorage.setItem('myArray', JSON.stringify(updatedList));
                    addFavButton.disabled=true;     
                } else {
                    alert('It is already in the favourite!!!!')
                }
                
                
            });
            createOption.appendChild(addFavButton);

            //opens up a new page with param as the element object used in the details 
            //of meal page
            createOption.addEventListener('click', () => {
                const detailsOfMeal = JSON.stringify(element);
                let url = 'meal-details.html?param='+encodeURIComponent(detailsOfMeal);
                window.open(url,'_blank');
            });
            inputDropdown.appendChild(createOption);
            console.log(listOfFavorites);   
        });
    }
}

export function updateListOfFavorites(updatedList) {
    listOfFavorites = updatedList;
    
    console.log(`list inside updates ${listOfFavorites.length}`);
}


console.log(listOfFavorites);