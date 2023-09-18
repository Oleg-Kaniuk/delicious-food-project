import { createMarkupElForFilter } from '/js/recipes/recipes.js'
import { KEY_FEEDBACK } from '/js/recipes/recipes.js'

const favList = document.querySelector('.favorite-recipes-list');
const emptyFav = document.querySelector('empty-favorites-container')
const favorite = JSON.parse(localStorage.getItem(KEY_FEEDBACK)) || [];

if (favorite.lenght > 0) {
 favList.insertAdjacentHTML('beforeend', createMarkupElForFilter(favorite));
    
    emptyFav.style.display = "none";
} else {
    console.error("Помилка");
    if (emptyFav) {
       emptyFav.style.display = "block"; 
    }
    
}